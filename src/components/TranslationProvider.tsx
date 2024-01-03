import React, { memo } from 'react';

import { TranslationContext, TranslationContextProps } from '../contexts';
import { useLocale } from '../hooks';

export type TranslationProviderProps = React.PropsWithChildren &
  TranslationContextProps &
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
    debug = false,
  }: TranslationProviderProps) => {
    /** Check the user's locale preference via the device settings */
    const locale = useLocale();

    return (
      <TranslationContext.Provider
        value={{
          token,
          defaultLanguage,
          targetLanguage: targetLanguage || locale,
          cacheTranslationsOnDevice,
          ignoreDefaultLanguageCountry,
          debug,
        }}>
        {children}
      </TranslationContext.Provider>
    );
  }
);
