import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config";

const LANGUAGE_KEY = "language";

export function useLanguagePersistence() {
  const { i18n: i18nHook } = useTranslation();

  useEffect(() => {
    // Initialize language from localStorage on mount
    const initializeLanguage = () => {
      try {
        const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage && savedLanguage !== i18n.language) {
          i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.warn("Failed to load saved language:", error);
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      initializeLanguage();
    }

    // Listen for language changes and save to localStorage
    const handleLanguageChange = (language: string) => {
      try {
        localStorage.setItem(LANGUAGE_KEY, language);
        // Update HTML lang attribute
        if (typeof document !== "undefined") {
          document.documentElement.lang = language;
        }
      } catch (error) {
        console.warn("Failed to save language:", error);
      }
    };

    // Use the raw i18n instance which has the event listener methods
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return i18nHook;
}
