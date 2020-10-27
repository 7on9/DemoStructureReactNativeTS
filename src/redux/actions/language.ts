import { LANGUAGE_CHANGE_LANGUAGE, LANGUAGE_TOGGLE_LANGUAGE } from './types'

export const changeLocale = (language: string) => ({
  type: LANGUAGE_CHANGE_LANGUAGE,
  language,
})

export const toggleLanguage = () => ({
  type: LANGUAGE_TOGGLE_LANGUAGE,
})
