import u from 'emrioutils'
import discord from 'discord.js'
import { Bot } from '../bot'
import config from '../config'
import { Service } from '.'

class StatusService extends Service {
  private interval: NodeJS.Timeout
  private values = config.status.values
  private updateInterval = config.status.update

  private async setStatus (): Promise<void> {
    const { content, type } = u.rand(this.values)

    await Bot.user.setActivity(content, { type: type as discord.ActivityType })
  }

  start (): void {
    clearInterval(this.interval)

    this.setStatus()

    this.interval = setInterval(() => this.setStatus(), this.updateInterval)
  }
}

export const Status = new StatusService()
