import { cookies, headers } from 'next/headers'
import { I18nConfig, Messages } from './types.d'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './constants'

export default async function detectLocale(): Promise<I18nConfig> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('LOCALE')?.value
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    const messages = (await import(`./locales/${cookieLocale}.json`)) as {
      default: Messages
    }
    return {
      locale: cookieLocale,
      defaultLocale: DEFAULT_LOCALE,
      locales: SUPPORTED_LOCALES,
      messages: messages.default || {},
    }
  }

  const acceptLang = (await headers()).get('accept-language') || ''
  const preferred = acceptLang.split(',')[0].split('-')[0]
  const matchedLocale = SUPPORTED_LOCALES.includes(preferred)
    ? preferred
    : DEFAULT_LOCALE

  const messages = (await import(`./locales/${matchedLocale}.json`)) as {
    default: Messages
  }

  return {
    locale: matchedLocale,
    defaultLocale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES,
    messages: messages.default || {},
  }
}
