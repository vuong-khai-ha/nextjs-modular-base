import { IClientAgent } from '@shared/types/clients.d'

export interface IAuthLoginPayload {
  email: string
  password: string
}

export interface IAuthToken {
  sessionId?: number | null
  role?: number
  userAgent?: IClientAgent | null
  ipAddress?: string | null
}

export interface IUserSessionPayload {
  ipAddress?: string
  userAgent?: IClientAgent
}
