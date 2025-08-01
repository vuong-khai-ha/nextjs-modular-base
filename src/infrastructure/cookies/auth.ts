import { cookies } from 'next/headers'
import { cache } from 'react'
import jwt from '@lib/jwt'
import { AUTH_COOKIES_NAME } from '@config/constants/tokens'
import { IAuthToken } from '@features/auth/types.d'

export const getToken = cache(async function (): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIES_NAME)?.value
  return token || null
})

export async function storeToken(user: IAuthToken): Promise<void> {
  const cookieStore = await cookies()
  const token = await jwt.sign({
    sessionId: user.sessionId,
    role: user.role,
    userAgent: user.userAgent,
    ipAddress: user.ipAddress,
  })
  cookieStore.set(AUTH_COOKIES_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIES_NAME)
}
