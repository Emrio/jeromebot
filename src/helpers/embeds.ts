import discord from 'discord.js'
import config from '../config'

export type Field = { title: string, body: string, blank?: false, inline?: boolean } | { blank: true, inline?: boolean }

interface Options {
  title?: string
  description?: string
  color?: number
  url?: string
  file?: string
  thumbnail?: string
}

export function generateEmbed (fields: Field[], opts?: Options): discord.RichEmbed {
  const embed = new discord.RichEmbed({
    title: opts && opts.title,
    description: opts && opts.description,
    url: opts && opts.url,
    footer: {
      text: config.embed.footer,
      iconURL: config.embed.icon
    },
    color: (opts && opts.color) || config.colors.primary,
    image: opts && opts.file ? { url: opts.file } : undefined,
    thumbnail: opts && opts.thumbnail ? { url: opts.thumbnail } : undefined
  })

  fields.forEach(field => {
    if (field.blank === true) {
      embed.addBlankField(field.inline)
    } else {
      embed.addField(field.title, field.body, field.inline)
    }
  })

  return embed
}
