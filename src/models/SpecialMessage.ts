import mongoose from 'mongoose'

export enum MessageType {
  FANART_SUMMARY = 'fanart-summary'
}

export interface SpecialMessage extends mongoose.Document {
  messageId: string
  messageType: MessageType
}

export const SpecialMessage = mongoose.model<SpecialMessage>('SpecialMessage', new mongoose.Schema({
  messageId: { type: String, required: true },
  messageType: { type: String, required: true }
}))
