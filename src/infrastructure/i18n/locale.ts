import { getTranslations } from 'next-intl/server'

type Translator = Awaited<ReturnType<typeof getTranslations>>

class Locale {
  private static instance: Locale
  private translator: Map<string, Translator> = new Map()

  private constructor() {}

  static getInstance(): Locale {
    if (!this.instance) {
      this.instance = new Locale()
    }
    return this.instance
  }

  public async getTranslator(locale: string): Promise<Translator> {
    const cached = this.translator.get(locale)
    if (cached) return cached

    const t = await getTranslations({ locale })
    this.translator.set(locale, t)
    return t
  }
}

export default Locale.getInstance()
