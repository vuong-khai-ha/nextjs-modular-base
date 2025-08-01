import { eq } from 'drizzle-orm'
import { db } from '@infrastructure/db/drizzle'
import { userSessions } from '@infrastructure/db/schema/users/sessions'

export async function deleteUserSession(id: number) {
  const [session] = await db
    .delete(userSessions)
    .where(eq(userSessions.id, id))
    .returning()
  return session
}
