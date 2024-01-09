/** Provides methods related to uuids */
export const uuid = {
  /** Generates a uuid */
  generate: () => {
    return (
      Date.now().toString(36) +
      Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
    );
  },
};
