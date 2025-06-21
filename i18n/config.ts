"use client"; // Tüm component'ler client-side'da çalışacak
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Çevirileri doğrudan import et
import * as enTranslations from "./translations/en/index.json";
import * as trTranslations from "./translations/tr/index.json";

// Get saved language from localStorage or default to Turkish
const getSavedLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "tr";
  }
  return "tr";
};

// Save language to localStorage
const saveLanguage = (language: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language);
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    tr: { translation: trTranslations },
  },
  lng: getSavedLanguage(), // Use saved language or default
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

// Listen for language changes and save to localStorage
i18n.on("languageChanged", (language) => {
  saveLanguage(language);
});

export default i18n;
