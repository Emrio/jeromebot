import u from 'emrioutils'
import discord from 'discord.js'
import config from '../config'
import { Fanarts } from '../services/Fanarts'
import { generateEmbed } from '../helpers/embeds'
const msgDebug = u.debug('bot', 'message')

async function handleGuildMessage (message: discord.Message): Promise<void> {
  if (!message.content.startsWith(config.prefix)) return

  try {
    const commandName = message.content.substr(config.prefix.length).split(' ')[0].toLowerCase()

    switch (commandName) {
      case 'fanarts': {
        if (!config.fanarts.channels.src.includes(message.channel.id)) break

        const messages = await message.channel.fetchPinnedMessages()
        await Fanarts.processMessages(messages.array())
        await message.react('✅')
        break
      }
    }
  } catch (e) {
    msgDebug.error(e)

    await message.channel.send(generateEmbed([{
      title: 'Internal Error',
      body: 'An internal error occured and has been reported. Please try again.'
    }
    ], {
      color: config.colors.error
    }))
  }
}

// fanart pins
export async function handlePin (channel: discord.TextChannel): Promise<void> {
  if (!config.fanarts.channels.src.includes(channel.id)) return

  const messages = await channel.fetchPinnedMessages()

  await Fanarts.processMessages(messages.array())
}

export async function handleAnyMessage (message: discord.Message): Promise<void> {
  msgDebug('New message from %o in %o/%o : %o', message.author.username, message.guild ? message.guild.id : 'DMs', message.channel.id, message.content)

  if (message.author.bot) return

  if (!message.content.trim()) return

  if (message.channel.type === 'dm') return

  await handleGuildMessage(message)
}
