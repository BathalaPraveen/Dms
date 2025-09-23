// src/i18n.jsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import en from "./locales/en.json";
import ms from "./locales/ms.json";

i18n
  .use(initReactI18next) // connect with React
  .init({
    resources: {
      en: { translation: en },
      ms: { translation: ms },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React already escapes
  });

export default i18n;
