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
  /**
   * Some context to the provide the translation (very useful when translating a single word without any surrounding words to give it context).
   *
   * For example, if you're translating the word "bank" from English to French, you can provide the context of "river" or "money" to get the correct translation.
   */
  context?: string;
  /** The issued token used to authenticate with the service (see lexiconjs.com dashboard) */
  token: string;
};

/** Translates a provided string into the desired language */
export const translate = async (text: string, { to, from, context, token }: Options) => {
  try {
    // If we didn't cache the translation, we need to fetch it from the API
    const result = await fetch(`${config.api.baseUrl}/translate`, {
      method: 'POST',
      headers: {
        // @ts-ignore - Custom API key header to authenticate with the service
        'x-api-key': token,
      },
      body: JSON.stringify({
        text,
        from,
        to,
        context,
      }),
    });

    /** Extract the translation */
    const translation = (result?.json?.() as any)?.translation;

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
