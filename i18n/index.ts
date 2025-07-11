import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

i18n
.use(initReactI18next) // Passes i18n down to react-i18next
.init({
  resources: {
    en: {
      translation: en,
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the current language translation is not available
  interpolation: {
    escapeValue: false, // React already does escaping
  }
});
export default i18n;