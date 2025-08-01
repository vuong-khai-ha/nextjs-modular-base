import { logger } from '@lib/logger'
import { deleteUserSession } from '@features/auth/commands/delete-user-session'
import { getAuthInfo } from '@features/auth/services/auth'
import { clearToken } from '@infrastructure/cookies/auth'

export async function signOut(): Promise<void> {
  try {
    const authInfo = await getAuthInfo()
    if (authInfo?.sessionId) await deleteUserSession(Number(authInfo.sessionId))
  } catch (error) {
    logger.error('features/auth/use-cases/sign-out.ts#signOut:', error)
  } finally {
    await clearToken()
  }
}
