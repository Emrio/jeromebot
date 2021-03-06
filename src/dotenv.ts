/**
 * @file Loads a dotenv file in development
 */

import config from './config'

if (config.env !== 'production') {
  try {
    require('dotenv').config()
    console.log('[DOTENV] Dotenv file loaded.')
  } catch (e) {
    console.error(e)
    console.log('[DOTENV] Dotenv not found. Please make sure env vars are set.')
  }
} else {
  console.log('[DOTENV] Dotenv not loaded. Please make sure env vars are set.')
}
