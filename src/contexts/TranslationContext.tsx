import React from 'react';

import type { Language } from '../types';

export type TranslationContextProps = {
  /** The token that is used to authenticate with the backend */
  token?: string;
  /**
   * The default language that we wrote the app in
   *
   * Defaults to "en" */
  defaultLanguage?: Language;
  /**
   * *Optional* - The target language that we are trying to convert all text within the app to
   *
   * Defaults to the detected user's language (based on device settings)
   */
  targetLanguage?: Language;
  /**
   * *Optional* - Whether or not to store cached translations on the device (highly recommended to reduce calls to the API and improve performance)
   *
   * Defaults to `true`
   */
  cacheTranslationsOnDevice?: boolean;
};

// ---------------------- START MAIN ---------------------- //
/** Provides global state surrounding our translations */
export const TranslationContext = React.createContext<TranslationContextProps>({});
// ---------------------- END MAIN ---------------------- //
