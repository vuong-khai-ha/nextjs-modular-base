import { NextRequest, type NextResponse } from 'next/server'
import { getClientIp, getBrowserInfo } from '@shared/utils/clients'
import { signIn } from '@features/auth/use-cases/sign-in'
import { signOut } from '@features/auth/use-cases/sign-out'
import { respondSuccess, respondError } from '@shared/utils/responses'
import { IAuthLoginPayload } from '@features/auth/types.d'
import { IPublicUser } from '@features/users/types.d'
import { IApiResponse } from '@shared/types/api.d'
import { logger } from '@lib/logger'

export async function POST(
  request: NextRequest,
): Promise<NextResponse<IApiResponse<IPublicUser | null>>> {
  try {
    logger.info('POST /api/auth/sessions - User login attempt')
    const { email, password } = (await request.json()) as IAuthLoginPayload
    const user = await signIn({
      email,
      password,
      ipAddress: getClientIp(request),
      userAgent: getBrowserInfo(request.headers.get('user-agent') || ''),
    })
    return respondSuccess(user, 'auth.login_success')
  } catch (error) {
    return respondError(error, 'auth.login_failed')
  }
}

export async function DELETE(): Promise<NextResponse<IApiResponse<null>>> {
  try {
    await signOut()
    return respondSuccess(null, 'auth.logout_success')
  } catch (error) {
    return respondError(error, 'auth.logout_failed')
  }
}
