import { Text as NativeText } from 'react-native';

import { TranslatedText } from '../dist';

type Props = React.PropsWithChildren<React.ComponentProps<typeof NativeText>> & {
  // translationOptions?: TranslatedTextOptions;
  translationOptions?: any;
};

/** A standardized text component with the addition of our translator */
export const Text = ({ children, style, translationOptions, ...props }: Props) => {
  return (
    <NativeText style={{ fontSize: 16, ...(typeof style === 'object' && style) }} {...props}>
      <TranslatedText {...translationOptions}>{children}</TranslatedText>
    </NativeText>
  );
};
