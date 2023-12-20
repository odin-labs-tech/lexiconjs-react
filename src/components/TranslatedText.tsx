import { Children, memo } from 'react';

import { TranslatedTextHelper } from './TranslatedTextHelper';
import type { useTranslation } from '../hooks';

type Props = React.PropsWithChildren & Parameters<typeof useTranslation>[1];

/**
 * Translate a block of text and returns the text as a string. Most the time you should be using your own custom `<Text>` component to abstract this
 * away (from whatever component / styling library you're working with).
 *
 * If nested elements are included within the `<TranslatedText>` they will be ignored and only the top-level text elements will be translated.
 * This should be fine in most scenarios because you should be using additional `<TranslatedText>` components within the nested elements.
 *
 * For example, if you had a `<Text>` component provided by my component library, you could create a `<CustomTextComponent>` leveraging translations as...
 *
 * ```
 * const CustomTextComponent = ({ children }) => {
 *   return (
 *     <Text>
 *       <TranslatedText from="en" to="es">
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
 *    This is a <CustomTextComponent style={{ fontWeight: 'bold' }}>bolded</CustomTextComponent> word
 * </CustomTextComponent>
 * ```
 */
export const TranslatedText = memo(({ children, ...options }: Props) => {
  // Loop over the children to see if it's an array and determine which elements are simply strings (and should be translated)
  // and which elements are nested elements (which should be left alone)
  return Children.map(children, (child) => {
    // If the child is a string, we need to translate it
    if (typeof child === 'string')
      return <TranslatedTextHelper {...options}>{child}</TranslatedTextHelper>;

    // Otherwise, it's a normal element and we just return the child as-is to avoid crashing
    return child;
  });
});
