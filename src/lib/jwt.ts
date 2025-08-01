import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

interface IOptions {
  algorithm?: string
  secret?: string
  expiresIn?: string
}

interface IPayload extends JWTPayload {
  [key: string]: string | number | boolean | object | null | undefined
}

class JWT {
  private static instance: JWT
  private secret: string
  private options: IOptions

  private constructor() {
    this.secret = process.env.JWT_SECRET!
    this.options = {
      algorithm: String(process.env.JWT_ALGORITHM ?? 'HS256'),
      expiresIn: '1d',
    }
  }

  public static getInstance(): JWT {
    if (!JWT.instance) JWT.instance = new JWT()
    return JWT.instance
  }

  public async sign(payload: IPayload, opts: IOptions = {}): Promise<string> {
    const { secret, ...customOpts } = opts
    return await new SignJWT(payload)
      .setProtectedHeader({
        alg: customOpts.algorithm ?? this.options.algorithm!,
      })
      .setIssuedAt()
      .setExpirationTime(customOpts.expiresIn ?? this.options.expiresIn!)
      .sign(new TextEncoder().encode(secret ?? process.env.JWT_SECRET!))
  }

  public async verify(
    token: string,
    opts: IOptions = {},
  ): Promise<JWTPayload | null> {
    const { secret } = opts
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret || process.env.JWT_SECRET!),
      )
      return payload
    } catch {
      return null
    }
  }
}

export default JWT.getInstance()
