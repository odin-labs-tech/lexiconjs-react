module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{cjs,ts,tsx,js,jsx}': ['eslint --fix', () => 'tsc --noEmit'],
};
