import { Heading as GlueHeading } from '@gluestack-ui/themed';
import { TranslatedText } from '@lexiconjs/react';

type Props = React.PropsWithChildren<React.ComponentProps<typeof GlueHeading>>;

/** A standardized text component with the addition of our translator */
export const Heading = ({ children, ...props }: Props) => {
  return (
    <GlueHeading {...props}>
      <TranslatedText>{children}</TranslatedText>
    </GlueHeading>
  );
};
