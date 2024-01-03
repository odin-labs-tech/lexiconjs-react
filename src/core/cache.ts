import { storage } from './storage';
import { Language } from '../types';

/** A helper method used to hash our strings into something easily stored / checked */
const hashString = (str: string) => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
};

/** An interface to interact with our translation cache */
export const cache = {
  /** Stores a translation in our cache */
  set: ({
    language,
    originalText,
    context,
    translatedText,
  }: {
    language: Language;
    originalText: string;
    context?: string;
    translatedText: string;
  }) => {
    /** Hash the text so we can use it as a key */
    const hash = hashString(context ? context + originalText : originalText);
    // Store the translation in our cache
    storage.set(`${language}_${hash}`, translatedText);
  },
  /** Retrieves a translation from our cache */
  get: ({
    language,
    originalText,
    context,
  }: {
    language: Language;
    originalText: string;
    context?: string;
  }) => {
    /** Hash the text so we can use it as a key */
    const hash = hashString(context ? context + originalText : originalText);
    // Retrieve the translation from our cache
    return storage.get(`${language}_${hash}`);
  },
  /** Clear the cache */
  clear: () => {
    storage.clear();
  },
};
