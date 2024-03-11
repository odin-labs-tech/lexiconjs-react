import { useMemo } from 'react';

import { useDeviceLocale } from './use-device-locale';
import type { Language } from '../types';

/** Returns details on the users current locale */
export const useLocale = () => {
  /** The raw locale that we detected on the user's device (formatted to focus on primary language) */
  const rawLocale = useDeviceLocale();

  /** The formatted version of the user's locale (remove excess info) */
  const locale = useMemo(() => {
    // If there is excess information tacked onto the locale (like @calendar=gregorian), remove it
    return rawLocale.split('@')[0] as Language;
  }, [rawLocale]);

  return { locale };
};
