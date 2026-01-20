import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import en from '../constants/translations/en';
import hi from '../constants/translations/hi';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const i18n = new I18n({
    en,
    hi,
});

// Set default locale to Hindi as requested
i18n.locale = 'hi';
i18n.enableFallback = true;
i18n.defaultLocale = 'hi';

// Function to set language
export const setLanguage = (lang) => {
    i18n.locale = lang;
    storage.set('user-language', lang);
};

// Function to get current language
export const getLanguage = () => {
    return i18n.locale;
};

// Initialize from storage if available
const savedLanguage = storage.getString('user-language');
if (savedLanguage) {
    i18n.locale = savedLanguage;
} else {
    // Default to Hindi if no preference saved
    i18n.locale = 'hi';
}

export default i18n;
