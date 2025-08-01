export interface IPublicUser {
  id: number
  email: string
  username: string
  fullName: string | null
  avatarUrl: string | null
  role: number
  status: number
}
