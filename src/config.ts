/**
 * @file Loads configuration files
 */
import { merge } from 'lodash'
import pkgj from '../package.json'
import cfg from '../assets/config.json'

export type Env = 'production' | 'local'

const cfg2 = {
  env: process.env.NODE_ENV === 'production' ? 'production' : 'local' as Env,
  version: pkgj.version
}

let config = {
  ...cfg,
  ...cfg2
}

if (config.env === 'local') {
  console.log('[CONFIG] Loading additional content...')
  const dev = require('../../assets/dev.json') // eslint-disable-line @typescript-eslint/no-var-requires

  config = merge({}, config, dev)
}

export default config
