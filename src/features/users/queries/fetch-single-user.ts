import { eq } from 'drizzle-orm'
import { db } from '@infrastructure/db/drizzle'
import { users } from '@infrastructure/db/schema/users/users'

export async function fetchUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  return user || null
}
