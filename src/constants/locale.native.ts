import { NativeModules, Platform } from "react-native";

/** Extract the locale from the user's native device settings */
const detectedLocale = Platform.OS === "ios"
? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0]
: NativeModules.I18nManager.localeIdentifier;

/** The locale that we detected on the user's device (formatted to focus on primary language) */
export const USER_LOCALE = detectedLocale?.split("-")[0] || "en";
