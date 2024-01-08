import { TranslatedText, TranslatedTextProps } from '@lexiconjs/react';
import { Text as NativeText } from 'react-native';

// import { TranslatedText, TranslatedTextProps } from '../dist';

type Props = React.PropsWithChildren<React.ComponentProps<typeof NativeText>> & {
  /**
   * Additional translation options that you can pass down to the translator. Feel
   * free to pass these props down in whatever form is most convenient for you.
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
