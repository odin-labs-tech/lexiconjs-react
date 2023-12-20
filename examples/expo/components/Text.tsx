import { TranslatedText } from '@lexiconjs/react';
import { Text as NativeText } from 'react-native';

type Props = React.PropsWithChildren<React.ComponentProps<typeof NativeText>>;

/** A standardized text component with the addition of our translator */
export const Text = ({ children, style, ...props }: Props) => {
  return (
    <NativeText style={{ fontSize: 16, ...(typeof style === 'object' && style) }} {...props}>
      <TranslatedText>{children}</TranslatedText>
    </NativeText>
  );
};
