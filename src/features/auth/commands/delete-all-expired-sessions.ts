import { lte } from 'drizzle-orm'
import { db } from '@infrastructure/db/drizzle'
import { userSessions } from '@infrastructure/db/schema/users/sessions'
import { AUTH_SESSION_DURATION } from '../constants'

export async function deleteAllExpiredSessions(): Promise<void> {
  await db
    .delete(userSessions)
    .where(
      lte(userSessions.createdAt, new Date(Date.now() - AUTH_SESSION_DURATION)),
    )
}
