/** Create a unique prefix to avoid any overlap (unlikely, but why not) */
const prefixId = 'translations';

/** An interface to interact with our underlying storage mechanism (MMKV on native / localStorage on web) */
export const storage = {
  /** Write an item to our storage */
  set: (key: string, value: string) => {
    localStorage?.setItem?.(`${prefixId}.${key}`, value);
  },
  /** Retrieve an item from our storage */
  get: (key: string) => {
    return localStorage?.getItem?.(`${prefixId}.${key}`);
  },
  /** Clear the storage */
  clear: () => {
    localStorage?.clear?.();
  },
};
