'use client';

import React, {
  Children,
  cloneElement,
  memo,
  useState,
  useEffect,
  useContext,
  isValidElement,
} from 'react';

import { Skeleton } from './skeleton';
import { TranslatedTextContext } from '../contexts';
import { TranslationOptions, useTranslator, useTranslationContext } from '../hooks';

export type TranslatedTextProps = React.PropsWithChildren &
  TranslationOptions & {
    /**
     * Whether to disable contextual translation for this element's children nodes. This is only relevant if you have nested <TranslatedText/> components
     * used to apply special formatting to words within a sentence.
     *
     * For example, we will by default translate the following as a single block of text:
     * ```
     * <Text>Total number of customers: <Text style={{ fontWeight: 'bold' }}>{count}</Text></Text>
     * ```
     *
     * This will cause the entire block of text to be re-translated even when only "count" changes. However, you can
     * set this prop to `true` in order to disable contextual translations and only translate the top-level text as follows:
     *
     * ```
     *
     * <Text translationOptions={{ disableContextualTranslation: true }}>Total number of customers: <Text style={{ fontWeight: 'bold' }} translationOptions={{ disableTranslation: true }}>{count}</Text></Text>
     * ```
     *
     * In this scenario, we will only translate "Total number of customers: " and leave "{count}" alone. This is useful if you
     * are showing something dynamic that increments or something and you don't want it to ping the API to try and translate it when it changes
     * (note the `disableTranslation` option on the inner text element as well).
     *
     * See the `examples/expo/components/Text.tsx` file for an example of how to use `translationOptions` on custom text components.
     *
     * Defaults to `false`
     */
    disableContextualTranslation?: boolean;
    /**
     * An optional override to the skeleton color in the TranslationProvider (if you want a particular piece of text to render with a different colored skeleton).
     */
    skeletonColor?: string;
    /**
     * Whether to render a skeleton in place of the text while it's being translated.
     *
     * This will default to `true` unless you have explicitly disabled it in the <TranslationProvider/>.
     */
    enableSkeleton?: boolean;
  };

/**
 * Translate a block of text and returns the text as a string. Most the time you should be using your own custom `<Text>` component to abstract this
 * away (from whatever component / styling library you're working with).
 *
 * If you are nesting multiple text elements within each other, we will attempt to translate them within the appropriate context
 * (for example, when nesting text elements to apply special formatting to a word within a sentence).
 *
 * Any non-text elements that we find will be left alone and not translated.
 *
 * As an example, if you had a `<Text>` component provided by my component library, you could create a `<CustomTextComponent>` leveraging translations as...
 *
 * ```
 * const CustomTextComponent = ({ children }) => {
 *   return (
 *     <Text>
 *       <TranslatedText>
 *         {children}
 *       </TranslatedText>
 *     </Text>
 *   );
 * };
 * ```
 *
 * Then, if you were nesting this to apply special styling (like bolding an inner word) you could do something like...
 *
 * ```
 * <CustomTextComponent>
 *    This is a <CustomTextComponent style={{ fontWeight: 'bold' }}>bolded</CustomTextComponent> example
 * </CustomTextComponent>
 * ```
 */
export const TranslatedText = memo(
  ({
    children,
    disableContextualTranslation,
    enableSkeleton,
    skeletonColor,
    ...options
  }: TranslatedTextProps) => {
    // Our actual translation method
    const { translate } = useTranslator();
    // Check our secondary context for any changes (useful when we have nested <TranslatedText/> components)
    const { translatedInParentsContext, isParentLoading } = useContext(TranslatedTextContext);
    // Check our primary context to see if translation is necessary
    const { needsTranslation, debug, enableSkeletons } = useTranslationContext({
      ...options,
      // We disable translations for various situations:
      // 1. If this is a number, we don't need to translate anything
      // 2. If this is being translated in the parent's context, the translation is handled there, so don't handle it here
      // 3. If the user told us to disable translations, we don't want to translate
      disableTranslation:
        typeof children === 'number' ?? translatedInParentsContext ?? options.disableTranslation,
    });
    // Track whether we're done loading our translations
    const [isLoading, setIsLoading] = useState(
      // We only need to load if we need to translate
      needsTranslation ||
        // We also need to account for text that doesn't necessarily need translation since it's parent is translating it (so it isn't loading),
        // but the parent is still loading the contextual version of the translation
        (translatedInParentsContext && isParentLoading)
    );
    // We need to generate our translation template to use for overall translations
    // If you're working with just strings, this could be as simple as "Translate this text!"
    // If you provide nested text nodes, it could be as complicated as "Translate <1>this text</1> and <3>this text</3>!"
    const [translationTemplate, setTranslationTemplate] = useState<string | undefined>();
    // After we determine our template and translate it, we'll store the translated result here
    const [translation, setTranslation] = useState<string | undefined>();
    /** The regex we can use to parse out nodes within our translation */
    const nodeLocationRegex = /(<\d+>.*?<\/\d+>)/;

    // Whenever children change, recompute our desired translationTemplate
    useEffect(() => {
      // If we don't need to translate this particular element (same language or translation disabled), don't run this logic
      // We also don't translate numbers (they're just numbers)
      if (!needsTranslation || typeof children === 'number') return;

      /** Loop over our children to create an array of string nodes to translate and later re-combine */
      const templateString = Children.map(children, (child: any, index) => {
        // If the child is a primitive, we just store it in our array directly
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'undefined')
          return child;
        // If the child is a React element containing a string, wrap the string with the index to later rebuild it
        // Note: we will not include children strings if we are disabling nested translations
        else if (
          (typeof child?.props?.children === 'string' ||
            typeof child?.props?.children === 'number') &&
          !disableContextualTranslation
        )
          return `<${index}>${child.props.children}</${index}>`;
        // Otherwise, it's a normal element and we need to just store the index to rebuild it later
        return `<${index}></${index}>`;
      })?.join('');

      // Store the computed translation template
      setTranslationTemplate(templateString);

      // Include a debug log to see computed translation template
      if (debug)
        console.log(
          `[@lexiconjs/react] Created translation template "${templateString}" with children`,
          children
        );
    }, [needsTranslation, disableContextualTranslation, debug, children]);

    // Whenever our translation template changes, we need to translate it
    useEffect(() => {
      // Don't run this until our translationTemplate becomes defined
      if (translationTemplate) {
        // Whenever our translation template changes, we'll re-enter our loading state
        setIsLoading(true);

        // Translate our template
        translate(translationTemplate, options)
          .then(({ translation, isSuccess }) => {
            // Store our translated text
            setTranslation(translation);

            // Include a debug log to see final translation result
            if (debug) {
              if (isSuccess) {
                console.log(
                  `[@lexiconjs/react] Successfully translated template to "${translation}" from "${translationTemplate}"`
                );
              } else {
                console.log(
                  `[@lexiconjs/react] Failed to translate template... falling back to "${translationTemplate}"`
                );
              }
            }
            // We're done loading at this point
            setIsLoading(false);
          })
          .catch((err) => {
            console.error('[@lexiconjs/react] There was a problem translating the text', err);
            // If we get an error (should NEVER happen, fallback to our original template)
            setTranslation(translationTemplate);
            setIsLoading(false);
          });
      }
    }, [debug, translationTemplate]);

    // If children are undefined, we definitely don't need to do anything
    if (typeof children !== 'number' && !children) return undefined;

    // If we are not done translating (or our translation has changed), don't show the translation
    if (isLoading) {
      // If we explicitly disabled the skeleton for this text, don't show it
      if (enableSkeleton === false) return undefined;
      // If we disabled skeletons globally and didn't override it to true for this text, don't show it
      if (enableSkeletons === false && enableSkeleton !== true) return undefined;
      // Otherwise, skeletons are enabled and we should render one

      // Return our skeleton with the updated children (and provide context to disable translations in some scenarios). There are two scenarios:
      // 1. The user has disabled contextual translation, in which case we don't want to disable translation (they should translate in parallel)
      // 2. The user has not disabled contextual translation, in which case we want to disable translations on children because they'll be handled by this component
      return (
        <TranslatedTextContext.Provider
          value={{
            translatedInParentsContext: !disableContextualTranslation || undefined,
            isParentLoading: true,
          }}>
          <Skeleton color={skeletonColor}>{children}</Skeleton>
        </TranslatedTextContext.Provider>
      );
    }

    // If we don't need to translate this particular element (same language or translation disabled), just return children as-is
    // We also don't translate numbers (they're just numbers)
    if (!needsTranslation || typeof children === 'number') return children;

    // If we're done loading, but we don't have a translation, return our original children (really shouldn't happen)
    if (!translation) return children;

    // If the original children were not an array and didn't contain any nodes, we can just return the translation as is and avoid extra computation
    if (!Array.isArray(children) && !translation.match(nodeLocationRegex)) return translation;

    // ---------- FINAL COMPOSITION ----------
    // Return modified / moved children based on the translation response
    /** Extract original children as an array */
    const originalChildren = Children.toArray(children);
    // Convert the translation string into an array of strings with their tags
    const translationArray = translation.split(nodeLocationRegex).filter(Boolean);

    // Convert our strings into React elements using the original children nodes where necessary
    const finalChildren = translationArray.map((translation) => {
      // Check whether the translation contains a tagged index
      const tagMatchRegex = /<(\d+)>(.*?)<\/\1>/;
      const match = translation.match(tagMatchRegex);

      // If we found a match, we need to wrap the translation with the original child
      if (match) {
        const originalIndex = parseInt(match[1], 10);
        const translatedText = match[2];
        const originalChild =
          originalChildren?.length - 1 >= originalIndex
            ? originalChildren[originalIndex]
            : undefined;

        // If no translated text exists here, it means that this is probably an element that we don't want to translate (like a random react node without string children)
        if (!translatedText) return originalChild;

        // Verify that the given react node is an element (it should always be)
        if (isValidElement(originalChild)) {
          return cloneElement(originalChild, {
            // Update the text children of this node to be the translated text
            children: translatedText,
          } as any);
        }
      }

      // Otherwise, we can just return the translation as a string
      return translation;
    });

    // Return our final set of children (ensure to disable translation where necessary using context). There are two scenarios:
    // 1. The user has disabled contextual translation, in which case we don't want to disable translation (they will translate separately)
    // 2. The user has not disabled contextual translation, in which case we want to disable translations on children because they were handled by this component
    return (
      <TranslatedTextContext.Provider
        value={{ translatedInParentsContext: !disableContextualTranslation || undefined }}>
        {finalChildren}
      </TranslatedTextContext.Provider>
    );
  }
);
