import './dotenv'
import mongoose from 'mongoose'
import { launchBot } from './bot'
import config from './config'

async function main (): Promise<void> {
  process.title = 'JeromeBot'

  if (!process.env.DB_URL) throw new Error('No DB_URL env var found!')

  await mongoose.connect(process.env.DB_URL, config.databaseConfig)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
