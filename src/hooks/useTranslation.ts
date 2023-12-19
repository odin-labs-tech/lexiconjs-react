import axios from 'axios';
import { useContext, useState, useEffect } from 'react';

import { config } from '../config';
import { TranslationContext } from '../contexts';
import type { Language } from '../types';

type Options = {
	/** *Optional* - The current language of the text we'd like to translate
	 *
	 * Defaults to value of `defaultLanguage` prop of `<TranslationProvider>`
	 */
	from?: Language;
	/**
	 * *Optional* - The target language that we are trying to convert the text to
	 *
	 * Defaults to value of `targetLanguage` prop of `<TranslationProvider>`
	 */
	to?: Language;
};

/** Accepts a string and translates it to the desired language */
export const useTranslation = (text: string, { from, to }: Options = {}) => {
	// Extract our configuration from the context
	const { defaultLanguage, targetLanguage, cacheTranslationsOnDevice } =
		useContext(TranslationContext);
	const [translation, setTranslation] = useState();

	useEffect(() => {
		// If text is not a string, the library is being using incorrectly
		if (typeof text !== 'string') {
			throw new Error('[@lexicon/react] useTranslation text must be a string');
		}

		// Check whether we're caching the translations on the device
		if (cacheTranslationsOnDevice) {
			// If so, check whether the translation already exists in the cache
			// TODO: Check storage for translation
			const cachedTranslation = null;
			// If we found the translation, return it
			if (cachedTranslation) return cachedTranslation;
		}

		// TODO: Make API call
		// If we didn't cache the translation, we need to fetch it from the API
		axios({
			method: 'GET',
			url: `${config.api.baseUrl}/translate`,
			data: {
				text,
				from: from || defaultLanguage,
				to: to || targetLanguage,
			},
		})
			.then(({ data }) => {
				// If we didn't find any data, throw an error
				if (!data) throw new Error('Failed to fetch translation');

				// Otherwise, show the translation
				setTranslation(data);
				// TODO: Store translation in storage
				// And store it in the cache if we're caching
				if (cacheTranslationsOnDevice) return;
			})
			.catch((err) => {
				console.error('[@lexicon/react] Failed to fetch translation', err);
				// Fall back to the provided text if we failed to fetch the translation
				return text;
			});
	}, [text, from, to]);

	return translation;
};
