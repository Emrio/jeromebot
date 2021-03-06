import u from 'emrioutils'
import { Client } from 'discord.js'
import { Status } from '../services/Status'
const debug = u.debug('bot')

export const Bot = new Client()

Bot.on('ready', () => {
  debug('I am ready!')

  Status.start()
})

Bot.on('error', err => {
  if (['ENOTFOUND', 'ETIMEDOUT', 'ECONNRESET'].includes((err as any).error.code)) { // eslint-disable-line @typescript-eslint/no-explicit-any
    debug.error('Connection lost. Reconnecting...')
  } else {
    debug.error("Houston, we've had a problem here!")
    debug.error(err)
  }
})

export async function launchBot (): Promise<void> {
  if (!process.env.TBJ_TOKEN) {
    throw new Error('No token provided')
  }

  await Bot.login(process.env.TBJ_TOKEN)
}
