import { TranslatedText, TranslatedTextProps } from '@lexiconjs/react';
import { Text as NativeText } from 'react-native';

type Props = React.PropsWithChildren<React.ComponentProps<typeof NativeText>> & {
  /**
   * Additional translation options that you can pass down to the translator
   *
   * Note: This **exact** prop naming is HIGHLY RECOMMENDED if you are using a custom <Text/> component
   * to wrap <TranslatedText/> IF you want to avoid retranslating children that are translated in the parent's context.
   *
   * For example, if you were to render the following:
   * ```
   * <Text>This is an <Text style={{ fontWeight: 'bold' }}>example</Text></Text>
   * ```
   *
   * then we will translate the entire block of text together and then automatically feed
   * `translationOptions={{ disableTranslation: true }}` to the inner <Text/> component (to avoid retranslating "example").
   * If you are already using `translationOptions` as a prop name (like here), then it will just work out of the box.
   *
   * However, the worst case scenario is that you just end up retranslating something that was already translated (nothing will break if
   * you don't include it).
   */
  translationOptions?: TranslatedTextProps;
};

/** A standardized text component with the addition of our translator */
export const Text = ({ children, style, translationOptions, ...props }: Props) => {
  return (
    <NativeText style={{ fontSize: 16, ...(typeof style === 'object' && style) }} {...props}>
      <TranslatedText {...translationOptions}>{children}</TranslatedText>
    </NativeText>
  );
};
