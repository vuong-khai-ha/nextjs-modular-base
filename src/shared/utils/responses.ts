import { NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'
import AppError from '@lib/errors/app-error'
import Locale from '@infrastructure/i18n/locale'
import { logger } from '@lib/logger'
import { IApiResponse } from '@shared/types/api.d'

/*** Begin: Success ***/
export async function respondSuccess<T>(
  data: T,
  message: string = 'common.requested_success',
  status: number = 200,
): Promise<NextResponse<IApiResponse<T>>> {
  const locale = await getLocale()
  const t = await Locale.getTranslator(locale)
  return NextResponse.json(
    { status: true, message: t(`notifications.${message}`), data },
    { status },
  )
}

/*** Begin: Error ***/
export async function respondError(
  error: unknown,
  message: string = 'common.unknown_error',
  statusCode: number = 500,
): Promise<NextResponse<IApiResponse<null>>> {
  const locale = await getLocale()
  const t = await Locale.getTranslator(locale)
  if (error instanceof AppError) {
    return NextResponse.json(
      { status: false, error: t(`notifications.${error.message}`) },
      { status: error.httpCode },
    )
  } else {
    logger.error('API Error:', error)
    return NextResponse.json(
      { status: false, error: t(`notifications.${message}`) },
      { status: statusCode >= 400 ? statusCode : 500 },
    )
  }
}
