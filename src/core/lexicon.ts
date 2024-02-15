import { config } from '../config';
import { Language } from '../types';

type TranslationOptions = {
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
   * *Optional* - Some context to the provide the translation (very useful when translating a single word without any surrounding words to give it context).
   *
   * For example, if you're translating the word "bank" from English to French, you can provide the context of "river" or "money" to get the correct translation.
   */
  context?: string;
  /**
   * *Optional* - If you wish to tweak the translation model and give it some additional guidance (for example, if it isn't handling certain translations the way you'd like),
   * you can provide a short message her to help guide the translation model.
   *
   * For example, you could say something like "Keep all currency formatting in the original language" to ensure currency is treated a certain way.
   *
   * Defaults to `undefined`
   */
  translationGuidance?: string;
  /** The issued token used to authenticate with the service (see lexiconjs.com dashboard) */
  token: string;
  /** A unique id used to identify the device */
  deviceId: string;
};

/** A utility granting access to backend lexicon services */
export const lexicon = {
  /** Translates a provided string into the desired language */
  translate: async (
    text: string,
    { to, from, context, token, translationGuidance, deviceId }: TranslationOptions
  ) => {
    try {
      // If we get an empty string or something, just resolve immediately
      if (!text) return { translation: '', isSuccess: true };

      console.log('[@lexiconjs/react] Unique ID', deviceId);

      // If we didn't cache the translation, we need to fetch it from the API
      const result = await fetch(`${config.api.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          // @ts-ignore - Custom API key header to authenticate with the service
          'x-api-key': token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          text,
          from,
          to,
          context,
          translationGuidance,
          // This should always be defined, but generate a fallback just in case
          deviceId,
        }),
      });

      /** Extract the translation */
      const translation = ((await result?.json?.()) as any)?.translation;

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
  },
  /** Register the device */
  registerDevice: async ({
    deviceId,
    locale,
    token,
  }: {
    /** A unique id used to identify the device */
    deviceId: string;
    /** The detected device's locale */
    locale: string;
    /** The issued token used to authenticate with the service (see lexiconjs.com dashboard) */
    token: string;
  }) => {
    try {
      await fetch(`${config.api.baseUrl}/device`, {
        method: 'POST',
        headers: {
          // @ts-ignore - Custom API key header to authenticate with the service
          'x-api-key': token,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          deviceId,
          locale,
        }),
      });
    } catch (err) {
      console.error('[@lexiconjs/react] There was a problem registering the device...', err);
    }
  },
};
