import mongoose from 'mongoose'

export interface Submission extends mongoose.Document {
  messageId: string
  authorId: string
  attachmentCount: number
}

export const Submission = mongoose.model<Submission>('Submission', new mongoose.Schema({
  messageId: { type: String, required: true },
  authorId: { type: String, required: true },
  attachmentCount: { type: Number, required: true }
}))
