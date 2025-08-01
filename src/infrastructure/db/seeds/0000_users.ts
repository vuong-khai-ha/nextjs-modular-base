import { faker } from '@faker-js/faker'
import { db } from '../drizzle'
import { users } from '../schema/users/users'
import {
  USER_ROLES,
  USER_STATUSES,
  type Role,
} from '../../../features/users/constants'
import { hashPassword } from '../../../lib/bcrypt'

const DUMMY_USER_COUNT = 100
const DEFAULT_PASSWORD = 'Abcd@1234'

export async function seed() {
  const password = await hashPassword(DEFAULT_PASSWORD)
  await db.insert(users).values(
    Array.from({ length: DUMMY_USER_COUNT }, () => ({
      username: `${faker.internet.username().toLowerCase()}`,
      email: faker.internet.email().toLowerCase(),
      passwordDigest: password,
      role: faker.helpers.arrayElement(
        Object.values(USER_ROLES).filter(Number) as Role[],
      ),
      status: USER_STATUSES.ACTIVE,
      fullName: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
    })),
  )
}
