import React, { memo } from 'react';
import { Text } from 'react-native';

import { useTranslationContext } from '../../hooks';

type SkeletonProps = React.PropsWithChildren & {
  /** The color override to user for the skeleton */
  color?: string;
};

/**
 * A very simple Skeleton placeholder for the text while it is being translated
 */
export const Skeleton = memo(({ color, children }: SkeletonProps) => {
  const { skeletonColor } = useTranslationContext();

  return (
    <Text
      style={{
        backgroundColor: color ?? skeletonColor,
        color: 'transparent',
        borderRadius: 30,
      }}>
      {children}
    </Text>
  );
});
