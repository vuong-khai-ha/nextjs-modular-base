import { eq } from 'drizzle-orm'
import { db } from '@infrastructure/db/drizzle'
import { users } from '@infrastructure/db/schema/users/users'
import { userSessions } from '@infrastructure/db/schema/users/sessions'

export async function fetchUserBySessionId(sessionId: number) {
  const [session] = await db
    .select({ userId: userSessions.userId })
    .from(userSessions)
    .where(eq(userSessions.id, sessionId))
    .limit(1)
  if (!session) return null

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1)

  return user
}
