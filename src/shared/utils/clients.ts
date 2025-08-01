import Bowser from 'bowser'
import { IClientAgent } from '../types/clients.d'

interface RequestWithIp {
  ip?: string
  socket?: { remoteAddress?: string }
  connection?: { remoteAddress?: string }
}

export function getClientIp(
  request: Request | { headers: Headers | Record<string, string> },
): string {
  const headers = 'headers' in request ? request.headers : request

  let forwardedFor: string | null = null
  if (headers instanceof Headers) {
    forwardedFor = headers.get('x-forwarded-for')
  } else if (typeof headers === 'object' && headers !== null) {
    forwardedFor = (headers['x-forwarded-for'] as string | undefined) || null
  }

  if (forwardedFor && typeof forwardedFor === 'string') {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp) return firstIp
  }

  const requestWithIp = request as RequestWithIp
  return (
    requestWithIp.ip ||
    requestWithIp.socket?.remoteAddress ||
    requestWithIp.connection?.remoteAddress ||
    'unknown'
  )
}

export function getBrowserInfo(userAgent: string): IClientAgent {
  const browser = Bowser.parse(userAgent)
  const browserInfo = browser.browser || {}
  const osInfo = browser.os || {}
  return {
    browserName: browserInfo.name || 'Unknown',
    browserVersion: browserInfo.version || 'Unknown',
    osName: osInfo.name || 'Unknown',
    osVersion: osInfo.versionName || 'Unknown',
  }
}
