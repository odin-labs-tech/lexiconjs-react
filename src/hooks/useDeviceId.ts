import { useMemo } from 'react';

import { storage, uuid } from '../core';

/** Returns a unique device id */
export const useDeviceId = () => {
  /** Retrieve the unique device ID from memory */
  const deviceId = useMemo(() => {
    /** Check for an existing device id */
    let currentDeviceId = storage.get('deviceId');

    // If we don't have a previous device ID, generate one
    if (!currentDeviceId) {
      currentDeviceId = uuid.generate();
      storage.set('deviceId', currentDeviceId);
    }

    return currentDeviceId;
  }, []);

  return {
    /** The unique id for this device */
    deviceId,
  };
};
