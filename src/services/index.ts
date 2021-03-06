import u from 'emrioutils'

export class Service {
  protected debug: u.Debugger

  constructor () {
    this.debug = u.debug('services', this.constructor.name)
  }
}
