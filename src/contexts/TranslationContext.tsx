'use client';

import React from 'react';

import type { Language } from '../types';

export type TranslationContextProps = {
  /** The token that is used to authenticate with the backend */
  token?: string;
  /**
   * The default language that the text in the app is written in.
   *
   * We highly recommended providing this to avoid translating text for users already utilizing the default language - ex. translating 'en' -> 'en').
   *
   * Defaults to "en-US" (English)
   */
  defaultLanguage?: Language;
  /**
   * *Optional* - The target language that we are trying to convert all text within the app to.
   *
   * We recommend not providing this so that the app is translated in all languages based on the user's device settings.
   *
   * Defaults to the detected user's language (based on device settings)
   */
  targetLanguage?: Language;
  /**
   * *Optional* - Whether or not to store cached translations on the device
   *
   * We highly recommended leaving this to `true` in order to reduce calls to the API and improve performance.
   *
   * Defaults to `true`
   */
  cacheTranslationsOnDevice?: boolean;
  /**
   * *Optional* - Whether or not we should translate when the `targetLanguage` country is different from our `defaultLanguage` (even when the base language is the same).
   * This can be useful if you expect some nuances in the dialects between your country and other countries that speak the same language, but isn't always necessary.
   *
   * For example, if this is set to `false`, then we will translate "en-US" -> "en-GB" (even though the base language is the same, the country is different).
   * Leaving it set to `true` will reduce the number of translations you have to pay for ("en-US" -> "en-GB" will not be translated and will remain as "en-US" when rendered).
   *
   * Defaults to `true`
   */
  ignoreDefaultLanguageCountry?: boolean;
  /**
   * *Optional* - The hex color to use for the Skeleton background color (we don't currently animate the skeleton).
   *
   * Defaults to `#D6D6D6`
   */
  skeletonColor?: string;
  /**
   * *Optional* - Whether or not we should render skeletons while we wait for our text to be translated.
   *
   * Defaults to `true`
   */
  enableSkeletons?: boolean;
  /** *Optional* - Whether we should output some debug logs to the console */
  debug?: boolean;
};

// ---------------------- START MAIN ---------------------- //
/** Provides global state surrounding our translations */
export const TranslationContext = React.createContext<TranslationContextProps>({});
// ---------------------- END MAIN ---------------------- //
