const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roles = [
  'user', 'admin'
]

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128,
    select: false
  },
  role: {
    type: String,
    default: 'user',
    enum: roles
  }
}, {
  timestamps: true
})

module.exports = { schema, roles }
