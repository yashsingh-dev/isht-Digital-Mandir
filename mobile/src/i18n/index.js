import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import 'intl-pluralrules';

import en from './en.json';
import hi from './hi.json';

const resources = {
    en: {
        translation: en,
    },
    hi: {
        translation: hi,
    },
};

// Detect the user's preferred language
const getLanguage = () => {
    const locales = Localization.getLocales();
    return locales[0]?.languageCode ?? 'hi';
}


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'hi', // Force default to Hindi as requested "Primary language will be Hindi"
        fallbackLng: 'hi', // Fallback to Hindi
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: 'v3', // Required for Android
    });

export default i18n;
