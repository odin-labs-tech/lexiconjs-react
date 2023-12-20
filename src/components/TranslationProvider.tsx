import { memo } from 'react';

import { USER_LOCALE } from '../constants';
import { TranslationContext, TranslationContextProps } from '../contexts';

type Props = React.PropsWithChildren &
  TranslationContextProps &
  Required<Pick<TranslationContextProps, 'token'>>;

/**
 * Wraps the entire application and provides the translation context
 * to be used when translating text with this package
 */
export const TranslationProvider = memo(
  ({
    children,
    token,
    defaultLanguage = 'en',
    targetLanguage = USER_LOCALE,
    cacheTranslationsOnDevice = true,
  }: Props) => {
    return (
      <TranslationContext.Provider
        value={{
          token,
          defaultLanguage,
          targetLanguage,
          cacheTranslationsOnDevice,
        }}>
        {children}
      </TranslationContext.Provider>
    );
  }
);
