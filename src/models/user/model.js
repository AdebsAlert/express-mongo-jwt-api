const mongoose = require('mongoose')
const { schema, roles } = require('./schema')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const httpStatus = require('http-status')
const APIError = require('../../utils/APIError')

// hash the password before saving it
schema.pre('save', function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

schema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'email', 'createdAt', 'role']

    fields.forEach((field) => {
      transformed[field] = this[field]
    })

    return transformed
  },

  passwordMatches (password) {
    return bcrypt.compareSync(password, this.password)
  }
})

schema.statics = {
  roles,

  checkDuplicateEmailError (err) {
    if (err.code === 11000) {
      var error = new Error('Email already exist')
      error.errors = [{
        field: 'email',
        location: 'body',
        messages: ['Email already exist']
      }]
      error.status = httpStatus.CONFLICT
      return error
    }

    return err
  },

  async findAndGenerateToken (payload) {
    const { email, password } = payload
    if (!email) throw new APIError('Email must be provided for login')

    const user = await this.findOne({ email }).select('+password').exec()
    if (!user) throw new APIError(`Incorrect login credentials`, httpStatus.NOT_FOUND)

    const passwordOK = await user.passwordMatches(password)

    if (!passwordOK) throw new APIError(`Incorrect login credentials`, httpStatus.UNAUTHORIZED)

    return user
  }
}

const User = mongoose.model('User', schema)
module.exports = User
