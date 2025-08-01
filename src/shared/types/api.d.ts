export interface IApiResponse<T> {
  status: boolean
  data?: T
  error?: string
}
