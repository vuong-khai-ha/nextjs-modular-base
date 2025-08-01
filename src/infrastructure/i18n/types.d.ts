import type { LocalePrefix } from 'next-intl/server'

export interface I18nConfig {
  locale: string
  defaultLocale: string
  locales: string[]
  localePrefix?: LocalePrefix
  messages: Messages
}

export type Messages = { [key: string]: string | null | undefined }
