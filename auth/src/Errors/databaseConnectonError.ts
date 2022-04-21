import { ValidationError } from 'express-validator'
import { CustomError } from './CustomError'

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to the database'
  statusCode = 500

  constructor() {
    super('Error connecting to database')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeError() {
    return [{ message: this.reason }]
  }
}
