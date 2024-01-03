import { useContext } from 'react';

import { TranslationOptions } from './useTranslator';
import { TranslationContext } from '../contexts';
import type { Language } from '../types';

export type UseTranslationContextProps = TranslationOptions;

/** Returns our primary context and some calculated values based on the provided options */
export const useTranslationContext = ({
  from,
  to,
  disableTranslation,
}: UseTranslationContextProps = {}) => {
  // Extract our configuration from the context
  const { defaultLanguage, targetLanguage, ignoreDefaultLanguageCountry, ...other } =
    useContext(TranslationContext);

  /** The language we want to translate from (fall back to context) */
  const fromLanguage = from || (defaultLanguage as Language);
  /** The language we want to translate to (fall back to context) */
  const toLanguage = to || (targetLanguage as Language);

  return {
    // RETURN CALCULATED VALUES
    /** The language we are translating this particular item from (based on options and context) */
    fromLanguage,
    /** The language we are translating this particular item to (based on options and context) */
    toLanguage,
    /** Whether this item requires translation (do the fromLanguage and toLanguage match) */
    needsTranslation:
      // If translations are disabled, we don't need to translate
      !disableTranslation &&
      // If we're ignoring the country, just check the base language
      !(ignoreDefaultLanguageCountry && fromLanguage.split('-')[0] === toLanguage.split('-')[0]) &&
      // Otherwise, compare the entire locale
      fromLanguage !== toLanguage,
    // RETURN DEFAULT CONTEXT VALUES
    defaultLanguage,
    targetLanguage,
    ignoreDefaultLanguageCountry,
    ...other,
  };
};
