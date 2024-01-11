import { useDeviceLocale } from './use-device-locale';

/** Returns details on the users current locale */
export const useLocale = () => {
  /** The locale that we detected on the user's device (formatted to focus on primary language) */
  const locale = useDeviceLocale();

  return { locale };
};
