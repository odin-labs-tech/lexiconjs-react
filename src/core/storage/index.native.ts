import { MMKV } from 'react-native-mmkv';

/** Initialize our storage object */
const mmkvStorage = new MMKV({
  id: 'translations',
});

/** An interface to interact with our underlying storage mechanism (MMKV on native / localStorage on web) */
export const storage = {
  /** Write an item to our storage */
  set: (key: string, value: string) => {
    mmkvStorage.set(key, value);
  },
  /** Retrieve an item from our storage */
  get: (key: string) => {
    return mmkvStorage.getString(key);
  },
  /** Clear the storage */
  clear: () => {
    mmkvStorage.clearAll();
  },
};
