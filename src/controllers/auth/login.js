'use strict'

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body)
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ success: true, message: 'login successful', token: token, user: user.transform() })
  } catch (error) {
    next(error)
  }
}
