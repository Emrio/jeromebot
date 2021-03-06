import './dotenv'
import mongoose from 'mongoose'
import { launchBot } from './bot'
import config from './config'

async function main (): Promise<void> {
  process.title = 'JeromeBot'

main().catch(err => {
  console.error(err)
  process.exit(1)
})
