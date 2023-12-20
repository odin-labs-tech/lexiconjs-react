import { Text as GlueText } from '@gluestack-ui/themed';
import { TranslatedText } from '@lexiconjs/react';

type Props = React.PropsWithChildren<React.ComponentProps<typeof GlueText>>;

/** A standardized text component with the addition of our translator */
export const Text = ({ children, ...props }: Props) => {
  return (
    <GlueText {...props}>
      <TranslatedText>{children}</TranslatedText>
    </GlueText>
  );
};
