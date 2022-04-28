import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import { currentUserRouter } from './routes/currentUser'
import { signInRouter } from './routes/signIn'
import { signOutRouter } from './routes/signOut'
import { signUpRouter } from './routes/signUp'
import { errorHandler } from './middlewares/errorHandling'
import { NotFoundError } from './Errors/NotFoundError'

const app = express()
app.use(express.json())
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async (req, res, next) => {
  next(new NotFoundError())
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

start()
