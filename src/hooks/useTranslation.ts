import { useState, useEffect } from 'react';

import { useTranslationContext } from './useTranslationContext';
import { useTranslator, TranslationOptions } from './useTranslator';

export type UseTranslationProps = TranslationOptions;

/** Accepts a string and translates it to the desired language */
export const useTranslation = (text: string, options: UseTranslationProps = {}) => {
  const { translate } = useTranslator();

  // Extract our configuration from the context
  const { toLanguage, fromLanguage, needsTranslation } = useTranslationContext(options);

  // If we don't need to translate this item, just return the text as is
  const [translation, setTranslation] = useState<string | undefined>(
    !needsTranslation ? text : undefined
  );

  useEffect(() => {
    // If we don't need to translate this text, just return
    if (!needsTranslation) {
      setTranslation(text);
      return;
    }

    // Translate the text
    translate(text, {
      from: fromLanguage,
      to: toLanguage,
      ...options,
    })
      .then(({ translation: translatedText }) => {
        // Set the state once we finish translating
        setTranslation(translatedText);
      })
      .catch((err) => {
        console.error('[@lexiconjs/react] There was a problem translating the text', err);
        // Fall back to the provided text if we failed to translate
        setTranslation(text);
      });
  }, [translate, text, fromLanguage, toLanguage]);

  return translation;
};
