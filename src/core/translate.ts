import axios from 'axios';

import { config } from '../config';
import { Language } from '../types';

type Options = {
  /**
   * *Optional* - The current language of the text we'd like to translate
   *
   * Defaults to value of `defaultLanguage` prop of `<TranslationProvider>`
   */
  from?: Language;
  /**
   * *Optional* - The target language that we are trying to convert the text to
   *
   * Defaults to value of `targetLanguage` prop of `<TranslationProvider>`
   */
  to: Language;
  /** The issued token used to authenticate with the service (see lexiconjs.com dashboard) */
  token: string;
};

/** Translates a provided string into the desired language */
export const translate = async (text: string, { to, from, token }: Options) => {
  try {
    console.log('[@lexiconjs/react] Translating text...', { text, from, to });

    // If we didn't cache the translation, we need to fetch it from the API
    const result = await axios({
      method: 'GET',
      url: `${config.api.baseUrl}/translate`,
      headers: {
        'x-api-key': token,
      },
      data: {
        text,
        from,
        to,
      },
    });

    /** Extract the translation */
    const translation = result.data;

    // If we didn't find any data, throw an error
    if (!translation) throw new Error('Failed to fetch translation');
    // Return our translation
    return {
      translation,
      isSuccess: true,
    };
  } catch (err) {
    console.error(
      '[@lexiconjs/react] There was a problem translating the text - falling back to original text...',
      err
    );
    // Fall back to the provided text if we failed to fetch the translation
    return {
      translation: text,
      isSuccess: false,
    };
  }
};
