export default class AppError extends Error {
  public code: string
  public httpCode: number

  constructor(code: string, httpCode: number = 500) {
    super(code)
    this.httpCode = httpCode
    this.code = code
    Error.captureStackTrace(this, this.constructor)
  }
}
