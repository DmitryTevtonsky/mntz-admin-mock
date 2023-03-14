import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: process.env.NODE_ENV !== 'production',

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    react: {
      useSuspense: true,
    },

    detection: {
      lookupCookie: 'lang',
    },

    load: 'currentOnly',

    backend: {
      loadPath: `/mntz-admin-mock/locales/{{lng}}/{{ns}}.json`,
      requestOptions: {
        cache: 'no-store',
      },
    },
  });

export default i18n;
