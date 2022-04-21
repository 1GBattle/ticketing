import { Request, Response, NextFunction } from 'express'

import { RequestValidationError } from '../Errors/reqestValidationError'
import { DatabaseConnectionError } from '../Errors/databaseConnectonError'
import { CustomError } from '../Errors/CustomError'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() })
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong, please try again' }]
  })
}
