import { initReactI18next } from 'react-i18next';
import esLocal from './es.local';
import enLocal from './en.local';
import localKeys from './keys';
import i18n from 'i18next';

const resourceKeys = localKeys;

const currentLanguage = 'es';

export { resourceKeys };

const resources = {
  en: { translation: enLocal },
  es: { translation: esLocal },
};

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
  interpolation: {
    escapeValue: false,
  },
});
