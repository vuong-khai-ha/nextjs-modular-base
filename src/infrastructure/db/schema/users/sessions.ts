import {
  pgTable,
  bigserial,
  bigint,
  varchar,
  json,
  timestamp,
  index,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'

export const userSessions = pgTable(
  'user_sessions',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    userId: bigint('user_id', { mode: 'number' })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    ipAddress: varchar('ip_address', { length: 255 }),
    userAgent: json('user_agent').default({
      browserName: 'Unknown',
      browserVersion: 'Unknown',
      osName: 'Unknown',
      osVersion: 'Unknown',
    }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
      .defaultNow()
      .notNull(),
  },
  (userSessions) => {
    return {
      userIdIndex: index('index_user_sessions_on_user_id').on(
        userSessions.userId,
      ),
    }
  },
)

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}))
