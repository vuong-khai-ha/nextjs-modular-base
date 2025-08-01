import { cache } from 'react'
import jwt from '@lib/jwt'
import AppError from '@lib/errors/app-error'
import { getToken } from '@infrastructure/cookies/auth'
import { IAuthToken } from '../types.d'

export const getAuthInfo = cache(async function (): Promise<IAuthToken | null> {
  try {
    const token = await getToken()
    if (!token) throw new AppError('auth.no_token', 401)

    const info = await jwt.verify(token)
    if (!info) throw new AppError('auth.invalid_token', 401)

    return info as IAuthToken
  } catch {
    throw new AppError('auth.invalid_token', 401)
  }
})
