export const USER_ROLES = {
  ADMIN: 9,
  MODERATOR: 1,
  STANDARD: 0,
} as const
export type Role = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const USER_STATUSES = {
  ACTIVE: 1,
  INACTIVE: 0,
} as const
export type Status = (typeof USER_STATUSES)[keyof typeof USER_STATUSES]
