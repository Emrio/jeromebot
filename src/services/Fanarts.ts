import { Message } from 'discord.js'
import moment from 'moment'
import { generateEmbed } from '../helpers/embeds'
import { Submission } from '../models/Submission'
import { TBJServer } from './TBJServer'
import { Service } from '.'
import { SpecialMessage, MessageType } from '../models/SpecialMessage'

class FanartsService extends Service {
  private async processMessage (message: Message): Promise<void> {
    if (!message.attachments.size) return

    const destination = TBJServer.destination

    const submission = new Submission({
      messageId: message.id,
      authorId: message.author.id,
      attachmentCount: message.attachments.array().length
    })
    await submission.save()

    this.debug('New message: %O', {
      member: message.author.toString(),
      files: message.attachments.array().map(a => a.url)
    })

    await destination.send(generateEmbed([
      {
        title: ':new: Fanart',
        body: `:artist: Author: ${message.author}\n:calendar_spiral: Submition date: ${moment(message.createdAt).format('MMMM Do YYYY')}\n${message.content ? (':scroll: Original message:\n' + message.content) : ''}`
      }
    ], {
      file: message.attachments.array()[0].url
    }))

    for (const { url } of message.attachments.array().slice(1)) {
      await destination.send(generateEmbed([], {
        file: url
      }))
    }

    await message.unpin()
  }

  private async clearSummaryMessages (): Promise<void> {
    const destination = TBJServer.destination

    const msgs = await SpecialMessage.find({ messageType: MessageType.FANART_SUMMARY })

    for (const msg of msgs) {
      const message = await destination.fetchMessage(msg.messageId)

      await msg.delete()
      await message.delete()
    }
  }

  private async sendSummaryMessage (): Promise<void> {
    const destination = TBJServer.destination
    const source = TBJServer.source[0]

    const submissions = await Submission.find()

    const submissionCount = submissions.length
    const fileCount = submissions.reduce((a, c) => a + c.attachmentCount, 0)
    const authorCount = new Set(submissions.map(sub => sub.authorId)).size

    const message = await destination.send(generateEmbed([
      {
        title: ':art: How to submit fanarts?',
        body: `If you would like to submit fanarts to this channel, please send them in ${source}, a moderator will add them for you!`
      },
      {
        title: ':hash: Statistics',
        body: `Number of files: **${fileCount}**\nNumber of submissions **${submissionCount}**\nNumber of unique authors: **${authorCount}**`
      }
    ], {
      title: 'Running to Never - Fanarts',
      thumbnail: 'https://static.emrio.fr/f/tbj-icon.png'
    }))

    const msg = new SpecialMessage({ messageId: message.id, messageType: MessageType.FANART_SUMMARY })
    await msg.save()
  }

  async processMessages (messages: Message[]): Promise<void> {
    if (!messages.length) return

    for (const message of messages) {
      await this.processMessage(message)
    }

    await this.clearSummaryMessages()

    await this.sendSummaryMessage()
  }
}

export const Fanarts = new FanartsService()
