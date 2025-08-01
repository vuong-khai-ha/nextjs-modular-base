import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@shared/contexts/auth-context'
import { IApiResponse } from '@shared/types/api.d'
import { IHookResponse } from '@shared/types/hooks.d'
import { API_AUTH_LOGOUT } from '@config/constants/endpoints'

export function useLogout() {
  const t = useTranslations('notifications.auth')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { setUser } = useAuth()

  const logout = async (): Promise<IHookResponse> => {
    if (isLoggingOut) return { status: false, message: t('logging_out') }

    try {
      setIsLoggingOut(true)
      const response = await fetch(API_AUTH_LOGOUT.endpoint, {
        method: API_AUTH_LOGOUT.method,
        headers: { 'Content-Type': 'application/json' },
      })
      const { status, error } = (await response.json()) as IApiResponse<null>

      if (status) {
        setUser(null)
        return { status, message: t('logout_success') }
      }
      return { status, message: error }
    } catch {
      return { status: false, message: t('logout_failed') }
    } finally {
      setIsLoggingOut(false)
    }
  }

  return {
    isLoggingOut,
    logout,
  }
}
