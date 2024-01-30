'use client';

import React, { memo, useEffect } from 'react';

import { TranslationContext, TranslationContextProps } from '../contexts';
import { lexicon } from '../core';
import { useLocale, useDeviceId } from '../hooks';

export type TranslationProviderProps = React.PropsWithChildren &
  Omit<TranslationContextProps, 'deviceId'> &
  Required<Pick<TranslationContextProps, 'token'>>;

/**
 * Wraps the entire application and provides the translation context
 * to be used when translating text with this package
 */
export const TranslationProvider = memo(
  ({
    children,
    token,
    defaultLanguage = 'en-US',
    targetLanguage,
    cacheTranslationsOnDevice = true,
    ignoreDefaultLanguageCountry = true,
    translationGuidance,
    enableSkeletons = true,
    skeletonColor = '#D6D6D6',
    debug = false,
  }: TranslationProviderProps) => {
    /** Check the user's locale preference via the device settings */
    const { locale } = useLocale();
    /** Generate a unique id to associate with the user's device */
    const { deviceId } = useDeviceId();

    // When we initialize, we want to register the device
    useEffect(() => {
      if (locale && deviceId) {
        lexicon.registerDevice({
          deviceId,
          locale,
          token,
        });
      }
    }, [locale, deviceId]);

    return (
      <TranslationContext.Provider
        value={{
          token,
          defaultLanguage,
          targetLanguage: targetLanguage || locale,
          cacheTranslationsOnDevice,
          ignoreDefaultLanguageCountry,
          translationGuidance,
          enableSkeletons,
          skeletonColor,
          deviceId,
          debug,
        }}>
        {children}
      </TranslationContext.Provider>
    );
  }
);
