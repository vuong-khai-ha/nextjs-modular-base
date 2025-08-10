import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from '@lib/jwt'
import { getBrowserInfo } from '@shared/utils/clients'
import { IClientAgent } from '@shared/types/clients.d'
import { AUTH_COOKIES_NAME } from '@config/constants/tokens'
import { API_AUTH_LOGIN } from '@config/constants/endpoints'
import { ROOT_PATH, LOGIN_PATH } from '@config/constants/routes'

const PUBLIC_ROUTES = [
  // UI
  ROOT_PATH,
  LOGIN_PATH,
  // API
  API_AUTH_LOGIN.endpoint,
]

const isApiRoute = (path: string) => path.startsWith('/api/')
const isStaticFile = (path: string) => {
  return (
    path.startsWith('/_next') ||
    path.startsWith('/images') ||
    path.startsWith('/favicon') ||
    path.includes('.')
  )
}
const isMatchedUserAgent = (
  currentAgent: IClientAgent,
  tokenAgent: IClientAgent,
): boolean => {
  if (!currentAgent || !tokenAgent) return false

  return (
    currentAgent.browserName === tokenAgent.browserName &&
    currentAgent.osName === tokenAgent.osName
  )
}

const respondUnauthorized = (request: NextRequest, forceDeleteToken: boolean = false) => {
  if (!isApiRoute(request.nextUrl.pathname)) {
    const res = NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    if (forceDeleteToken) res.cookies.delete(AUTH_COOKIES_NAME)
    return res
  }
  return NextResponse.json({}, { status: 401, statusText: 'Unauthorized' })
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isStaticFile(pathname)) return NextResponse.next()
  if (PUBLIC_ROUTES.includes(pathname)) return NextResponse.next()

  const token = request.cookies.get(AUTH_COOKIES_NAME)?.value
  if (!token) return respondUnauthorized(request)

  const decodedToken = await jwt.verify(token)
  if (!decodedToken) return respondUnauthorized(request, true)

  const tokenAgent = decodedToken.userAgent as IClientAgent
  const currentAgent = getBrowserInfo(request.headers.get('user-agent') || '')
  if (!isMatchedUserAgent(currentAgent, tokenAgent))
    return respondUnauthorized(request, true)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
