import cron from 'node-cron'
import { logger } from '../lib/logger'
import { deleteAllExpiredSessions } from '../features/auth/commands/delete-all-expired-sessions'

logger.info('Initialized cronjobs - sessions')
if (process.env.ENABLE_CRON === 'true') {
  // Job: Remove expired sessions every hour
  cron.schedule('0 * * * *', async () => {
    try {
      logger.info('BEGIN: (Cronjob) Removing user sessions')
      await deleteAllExpiredSessions()
      logger.info('END: (Cronjob) Removing user sessions')
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      logger.error(`END: (Cronjob) Removing user sessions: ${errorMessage}`)
    }
  })
}
