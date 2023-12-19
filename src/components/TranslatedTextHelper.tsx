import { memo } from 'react';

import { useTranslation } from '../hooks';

type Props = Parameters<typeof useTranslation>[1] & {
	/** The string child to translate */
	children: string;
};

/**
 * This component simply serves as a helper to translate an individual string. It's used by the `<TranslatedText>` component after identifying which elements are strings
 */
export const TranslatedTextHelper = memo(({ children, ...options }: Props) => {
	const translation = useTranslation(children, options);

	// Once we have the translation, just return it
	if (translation) return translation;

	// TODO: Figure out skeletons with this component
	// Otherwise, return a skeleton
	return null;
});
