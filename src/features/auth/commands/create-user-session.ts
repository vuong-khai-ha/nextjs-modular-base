import { db } from '@infrastructure/db/drizzle'
import { userSessions } from '@infrastructure/db/schema/users/sessions'
import { IUserSessionPayload } from '../types.d'

export async function createUserSession(
  userId: number,
  clientInfo: IUserSessionPayload,
): Promise<typeof userSessions.$inferInsert> {
  const [session] = await db
    .insert(userSessions)
    .values({
      userId,
      ipAddress: clientInfo.ipAddress,
      userAgent: clientInfo.userAgent,
    })
    .returning()

  return session
}
