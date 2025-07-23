// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    // ✅ CONFIGURAÇÃO PARA SALVAR O IDIOMA
    detection: {
      order: ['localStorage', 'navigator'], // 1º: Procura no localStorage, 2º: no idioma do navegador
      caches: ['localStorage'], // Salva a escolha do usuário no localStorage
    },
  });

export default i18n;