import { LANGUAGE_CHANGE_LOCALE, LANGUAGE_TOGGLE_LOCALE } from './types'

export const changeLocale = (locale: string) => ({
  type: LANGUAGE_CHANGE_LOCALE,
  locale,
})

export const toggleLanguage = () => ({
  type: LANGUAGE_TOGGLE_LOCALE,
})
