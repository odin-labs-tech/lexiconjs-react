'use client';

import React from 'react';

import type { TranslationOptions } from '../hooks';

export type TranslatedTextContextProps = Pick<TranslationOptions, 'disableTranslation'>;

// ---------------------- START MAIN ---------------------- //
/** Provides secondary state used to support nested <TranslatedText/> components */
export const TranslatedTextContext = React.createContext<TranslatedTextContextProps>({});
// ---------------------- END MAIN ---------------------- //
