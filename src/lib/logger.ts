// eslint-disable no-console
const currentTime = (): string => new Date().toISOString()

export const logger = {
  info: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.log('======== [INFO]', currentTime(), ...args)
  },
  warn: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.warn('======== [WARN]', currentTime(), ...args)
  },
  error: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.error('======== [ERROR]', currentTime(), ...args)
  },
  debug: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('======== [DEBUG]', currentTime(), ...args)
    }
  },
}
