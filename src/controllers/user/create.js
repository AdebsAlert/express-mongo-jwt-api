'use strict'

const User = require('../../models/user')
const httpStatus = require('http-status')

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send({ success: true, message: 'user created successfully', data: savedUser.transform() })
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}
