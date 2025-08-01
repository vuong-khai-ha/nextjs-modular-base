import AppError from '@lib/errors/app-error'
import { comparePassword } from '@lib/bcrypt'
import { storeToken } from '@infrastructure/cookies/auth'
import { fetchUserByEmail } from '@features/users/queries/fetch-single-user'
import { createUserSession } from '../commands/create-user-session'
import { serializePublicUser } from '@features/users/serializers/public-user'
import { IAuthLoginPayload, IUserSessionPayload } from '../types.d'
import { IPublicUser } from '@features/users/types.d'

export async function signIn(
  payload: IAuthLoginPayload & IUserSessionPayload,
): Promise<IPublicUser> {
  const { email, password, ipAddress, userAgent } = payload

  const user = await fetchUserByEmail(email)
  if (!user) throw new AppError('auth.wrong_email_or_invalid_password', 422)

  const isPasswordValid = await comparePassword(password, user.passwordDigest)
  if (!isPasswordValid)
    throw new AppError('auth.wrong_email_or_invalid_password', 422)

  const session = await createUserSession(user.id, { ipAddress, userAgent })
  if (!session) throw new AppError('auth.login_failed', 500)

  await storeToken({
    sessionId: session.id,
    role: user.role,
    userAgent,
    ipAddress,
  })

  return serializePublicUser(user)
}
