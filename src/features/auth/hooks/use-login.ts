import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@shared/contexts/auth-context'
import { IApiResponse } from '@shared/types/api.d'
import { IHookResponse } from '@shared/types/hooks.d'
import { IAuthLoginPayload } from '../types.d'
import { IPublicUser } from '@features/users/types.d'
import { API_AUTH_LOGIN } from '@config/constants/endpoints'

export function useLogin() {
  const t = useTranslations('notifications.auth')
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)
  const { setUser } = useAuth()

  const login = async ({
    email,
    password,
  }: IAuthLoginPayload): Promise<IHookResponse> => {
    if (isLoggingIn) return { status: false, message: t('logging_in') }

    try {
      setIsLoggingIn(true)
      const response = await fetch(API_AUTH_LOGIN.endpoint, {
        method: API_AUTH_LOGIN.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const { status, data, error } =
        (await response.json()) as IApiResponse<IPublicUser>

      if (status) {
        setUser(data)
        return { status, message: t('login_success') }
      }
      return { status, message: error }
    } catch {
      return { status: false, message: t('login_failed') }
    } finally {
      setIsLoggingIn(false)
    }
  }

  return {
    isLoggingIn,
    login,
  }
}
