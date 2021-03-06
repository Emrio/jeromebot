import { TextChannel } from 'discord.js'
import { Bot } from '../bot'
import config from '../config'
import { Service } from '.'

class TBJServerService extends Service {
  private srcChannels: TextChannel[]
  private dstChannel: TextChannel

  get source (): TextChannel[] {
    if (this.srcChannels) {
      return this.srcChannels
    }

    const src = config.fanarts.channels.src
    this.srcChannels = Bot.channels.filter(({ id }) => src.includes(id)).array() as TextChannel[]

    return this.srcChannels
  }

  get destination (): TextChannel {
    if (this.dstChannel) {
      return this.dstChannel
    }

    const channel = Bot.channels.get(config.fanarts.channels.dst)

    if (!channel) {
      throw new Error('Channel does not exist')
    }

    this.dstChannel = channel as TextChannel

    return this.dstChannel
  }
}

export const TBJServer = new TBJServerService()
