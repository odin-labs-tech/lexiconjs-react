import { useContext, useState, useEffect, useMemo } from 'react';

import { useTranslator } from './useTranslator';
import { TranslationContext } from '../contexts';
import type { Language } from '../types';

/** Accepts a string and translates it to the desired language */
export const useTranslation = (
  text: string,
  { from, to }: Parameters<ReturnType<typeof useTranslator>['translate']>[1] = {}
) => {
  // Extract our configuration from the context
  const { defaultLanguage, targetLanguage, ignoreDefaultLanguageCountry } =
    useContext(TranslationContext);
  const { translate } = useTranslator();

  /** The language we want to translate from (fall back to context) */
  const fromLanguage = useMemo(
    () => from || (defaultLanguage as Language),
    [from, defaultLanguage]
  );
  /** The language we want to translate to (fall back to context) */
  const toLanguage = useMemo(() => to || (targetLanguage as Language), [to, targetLanguage]);

  // If we are in the same language, just return the text straight away, otherwise we leave it undefined until we set it
  const [translation, setTranslation] = useState<string | undefined>(
    // If we're ignoring the country, just check the base language
    (ignoreDefaultLanguageCountry && fromLanguage.split('-')[0] === toLanguage.split('-')[0]) ||
      // Otherwise, compare the entire locale
      fromLanguage === toLanguage
      ? text
      : undefined
  );

  useEffect(() => {
    console.log('TRANSLATE', { text, fromLanguage, toLanguage });
    // Translate the text
    translate(text, {
      from: fromLanguage,
      to: toLanguage,
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
