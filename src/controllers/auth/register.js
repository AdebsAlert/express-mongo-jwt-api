'use strict'

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const httpStatus = require('http-status')

exports.register = async (req, res, next) => {
  try {
    const user = new User(req.body)

    const savedUser = await user.save()
    const payload = {sub: savedUser.id}
    const token = jwt.sign(payload, config.secret)
    res.status(httpStatus.CREATED)
    res.send({ success: true, message: 'registration successful', token: token, user: savedUser.transform() })
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}
