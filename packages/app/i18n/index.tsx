import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import fr from '../i18n/locales/fr.json'
import en from '../i18n/locales/en.json'

const isWeb = typeof window !== 'undefined' && window.localStorage

const storage = {
  getItem: async (key: string) => {
    if (isWeb) {
      return window.localStorage.getItem(key)
    }
    return AsyncStorage.getItem(key)
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      window.localStorage.setItem(key, value)
    } else {
      await AsyncStorage.setItem(key, value)
    }
  },
}

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      const storedLanguage = await storage.getItem('user-language')
      if (storedLanguage) {
        callback(storedLanguage)
      } else {
        const deviceLanguage = Localization.getLocales()[0].languageCode
        callback(deviceLanguage ?? 'en')
      }
    } catch (error) {
      console.error('Error detecting language:', error)
      callback('en')
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await storage.setItem('user-language', lng)
    } catch (error) {
      console.error('Error caching language:', error)
    }
  },
}

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
