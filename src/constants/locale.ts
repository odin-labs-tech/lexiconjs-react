/** Extract the locale from the user's browser settings */
const detectedLocale = window.navigator.language || (window as any).navigator.userLanguage;

/** The locale that we detected on the user's device (formatted to focus on primary language) */
export const USER_LOCALE = detectedLocale?.split("-")[0] || "en";
