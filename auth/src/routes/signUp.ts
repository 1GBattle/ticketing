import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../Errors/BadRequestError'

import { RequestValidationError } from '../Errors/reqestValidationError'
import { User } from '../models/user'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email is invalid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const { email, password } = req.body

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array())
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    const user = User.build({ email, password })
    await user.save()
    res.status(201).send(user)
  }
)

export { router as signUpRouter }
