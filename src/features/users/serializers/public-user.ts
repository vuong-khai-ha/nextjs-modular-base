import { IPublicUser } from '../types.d'
import { users } from '@infrastructure/db/schema/users/users'

export function serializePublicUser(
  user: typeof users.$inferSelect,
): IPublicUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
    role: user.role,
    status: user.status,
  }
}
