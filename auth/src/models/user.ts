import mongoose from 'mongoose'
import { Password } from '../services/passwordHashing'

// interface that describes the properties for a new user
interface UserAttrs {
  email: string
  password: string
}

// interface that describes props that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

// interface that describes the props that a user document has
interface UserDoc extends mongoose.Document<any> {
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (done: any) {
  if (this.isModified('password')) {
    // gets the user password off of the documents and then passes it to hashedPassword variable
    const hashedPassword = await Password.toHash(this.get('password'))

    this.set('password', hashedPassword)

    done()
  }
})

// gets ts involved in making a new user
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

const user = User.build({
  email: 'some email',
  password: 'some password'
})

export { User }
