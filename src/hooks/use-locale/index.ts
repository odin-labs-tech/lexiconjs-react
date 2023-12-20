import { useMemo } from 'react';

import { Language } from '../../types';

/** Detects the user's locale from their device settings */
export const useLocale = () => {
  /** The locale that we detected on the user's device (formatted to focus on primary language) */
  const locale = useMemo(() => {
    /** Extract the locale from the user's browser settings */
    const detectedLocale = window.navigator.language || (window as any).navigator.userLanguage;

    // Only use the first portion of the locale and fall back to English
    return detectedLocale?.split('-')[0] || 'en';
  }, []);

  return locale as Language;
};
