import { L10n, TranslationKeys } from '@/utils/translationHelper';
import { useTranslation } from 'react-i18next';

export function useTranslations() {
    const{ t, i18n } = useTranslation();

    const typeT = ( key: TranslationKeys, options?: Record<string, any>) => {
        return t(key, options);
    };

    return {
        t: typeT,
        i18n,
        L10n,
        changeLanguage: i18n.changeLanguage,
        language: i18n.language,
    }
}