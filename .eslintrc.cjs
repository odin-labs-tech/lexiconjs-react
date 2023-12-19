module.exports = {
	extends: [
		'universe/shared/core',
		'universe/shared/typescript',
		'universe/shared/react',
		'prettier',
	],
	ignorePatterns: ['/dist/'],
	rules: {
		'@typescript-eslint/prefer-nullish-coalescing': 0,
		'no-new': 0,
	},
  settings: {
    'import/ignore': ['react-native'],
  }
};
