import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import az from './locales/az.json';
import en from './locales/en.json';

// Get saved language from localStorage or default to 'az'
const savedLanguage = localStorage.getItem('language') || 'az';

const resources = {
  az: {
    translation: az,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'az',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Update localStorage when language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.documentElement.lang = lng;
});

export default i18n;
