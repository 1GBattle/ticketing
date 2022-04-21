import { CustomError } from './CustomError'

export class NotFoundError extends CustomError {
  statusCode = 404

  constructor() {
    super('Route not found on server')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeError() {
    return [{ message: 'Route not found on server' }]
  }
}