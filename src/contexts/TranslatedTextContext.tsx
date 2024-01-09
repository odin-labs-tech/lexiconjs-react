'use client';

import React from 'react';

export type TranslatedTextContextProps = {
  /** Whether this text element is being translated in the parent's context (disableContextualTranslation is not true) */
  translatedInParentsContext?: boolean;
  /** Whether the parent is currently loading (so children know when to remove skeleton) */
  isParentLoading?: boolean;
};

// ---------------------- START MAIN ---------------------- //
/** Provides secondary state used to support nested <TranslatedText/> components */
export const TranslatedTextContext = React.createContext<TranslatedTextContextProps>({});
// ---------------------- END MAIN ---------------------- //
