import { storage } from './storage';
import { Language } from '../types';

/** An interface to interact with our translation cache */
export const cache = {
  /** Stores a translation in our cache */
  set: ({
    language,
    originalText,
    context,
    translationGuidance,
    translatedText,
  }: {
    language: Language;
    originalText: string;
    context?: string;
    translationGuidance?: string;
    translatedText: string;
  }) => {
    /** Hash the text so we can use it as a key */
    const hash = createHash({ translationGuidance, context, originalText });
    // Store the translation in our cache
    storage.set(`${language}_${hash}`, translatedText);
  },
  /** Retrieves a translation from our cache */
  get: ({
    language,
    originalText,
    context,
    translationGuidance,
  }: {
    language: Language;
    originalText: string;
    context?: string;
    translationGuidance?: string;
  }) => {
    /** Hash the text so we can use it as a key */
    const hash = createHash({ translationGuidance, context, originalText });

    hashString(`${translationGuidance ?? ''}${context ?? ''}${originalText}`);
    // Retrieve the translation from our cache
    return storage.get(`${language}_${hash}`);
  },
  /** Clear the cache */
  clear: () => {
    storage.clear();
  },
};

// HELPERS
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

/** Create a unique hash using our provided parameters */
const createHash = ({
  translationGuidance,
  context,
  originalText,
}: {
  translationGuidance?: string;
  context?: string;
  originalText: string;
}) => {
  return hashString(`${translationGuidance ?? ''}${context ?? ''}${originalText}`);
};
