'use client';

import React, { memo } from 'react';

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
    <span
      style={{
        backgroundColor: color ?? skeletonColor,
        color: 'transparent',
        borderRadius: 30,
        userSelect: 'none',
      }}>
      {children}
    </span>
  );
});
