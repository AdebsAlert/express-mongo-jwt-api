'use strict'

const User = require('../../models/user')
const httpStatus = require('http-status')

exports.updateUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({_id: req.params.user}, req.body, {new: true}, (error, user) => {
      if (error || user === null) {
        res.status(httpStatus.BAD_REQUEST)
        res.send({ success: false, message: 'cannot update user', error })
      }

      if (user) {
        res.status(httpStatus.CREATED)
        res.send({ success: true, message: 'user updated successfully', data: user })
      }
    })
  } catch (error) {
    next(error)
  }
}
