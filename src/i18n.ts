import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

// Detect user's preferred language
const getDefaultLanguage = (): string => {
  if (typeof window === 'undefined') return 'pt';
  
  const stored = localStorage.getItem('tempera_lang');
  if (stored && ['pt', 'en', 'es'].includes(stored)) {
    return stored;
  }
  
  const browserLang = navigator.language.split('-')[0];
  if (['pt', 'en', 'es'].includes(browserLang)) {
    return browserLang;
  }
  
  return 'pt';
};

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
    es: { translation: es },
  },
  lng: getDefaultLanguage(),
  fallbackLng: 'en',
  interpolation: { 
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Persist language changes
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tempera_lang', lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
