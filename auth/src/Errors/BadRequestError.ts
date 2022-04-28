import { ValidationError } from 'express-validator'
import { CustomError } from './CustomError'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError)
  }

  serializeError(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }]
  }
}
