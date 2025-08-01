import AppError from '@lib/errors/app-error'
import { fetchUserBySessionId } from '../queries/fetch-single-user'
import { getAuthInfo } from '../services/auth'
import { serializePublicUser } from '@features/users/serializers/public-user'
import { USER_STATUSES } from '@features/users/constants'
import { IPublicUser } from '@features/users/types.d'

export async function getCurrentUser(): Promise<IPublicUser> {
  const authInfo = await getAuthInfo()
  const user = await fetchUserBySessionId(Number(authInfo?.sessionId))
  if (!user) throw new AppError('auth.invalid_token', 401)
  if (user.status === USER_STATUSES.INACTIVE)
    throw new AppError('auth.user_inactive', 401)

  return serializePublicUser(user)
}

export async function nullableCurrentUser(): Promise<IPublicUser | null> {
  return await getCurrentUser().catch(() => null)
}
