import { useContext, useState, useEffect } from 'react';

import { TranslationContext } from '../contexts';
import { translate, cache } from '../core';
import type { Language } from '../types';

/** Accepts a string and translates it to the desired language */
export const useTranslation = (
  text: string,
  { from, to }: Omit<Partial<Parameters<typeof translate>[1]>, 'token'>
) => {
  // Extract our configuration from the context
  const { defaultLanguage, targetLanguage, cacheTranslationsOnDevice, token } =
    useContext(TranslationContext);
  const [translation, setTranslation] = useState<string | undefined>();

  /** The language we want to translate from (fall back to context) */
  const fromLanguage = (from || defaultLanguage) as Language;
  /** The language we want to translate to (fall back to context) */
  const toLanguage = (to || targetLanguage) as Language;

  useEffect(() => {
    // If the token was not set, throw an error
    if (!token)
      throw new Error(
        '[@lexiconjs/react] Please provide the token from your lexiconjs.com dashboard'
      );

    // If text is not a string, the library is being using incorrectly
    if (typeof text !== 'string')
      throw new Error('[@lexiconjs/react] useTranslation text must be a string');

    // Check whether we're caching the translations on the device
    if (cacheTranslationsOnDevice) {
      // If so, check whether the translation already exists in the cache
      const cachedTranslation = cache.get({ language: toLanguage, originalText: text });
      // If we found the translation, return it
      if (cachedTranslation) {
        // Set the state to our cached result and return early
        setTranslation(cachedTranslation);
        return;
      }
    }

    // Translate the text
    translate(text, {
      from: fromLanguage,
      to: toLanguage,
      token,
    })
      .then((translatedText) => {
        // Set the state once we finish translating
        setTranslation(translatedText);

        // And store it in the cache if we're caching
        if (cacheTranslationsOnDevice)
          cache.set({ language: toLanguage, originalText: text, translatedText });
      })
      .catch((err) => {
        console.error('[@lexiconjs/react] There was a problem translating the text', err);
        // Fall back to the provided text if we failed to translate
        setTranslation(text);
      });
  }, [text, from, to]);

  return translation;
};
