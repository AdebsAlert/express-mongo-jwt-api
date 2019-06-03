'use strict'

const User = require('../../models/user')
const httpStatus = require('http-status')

exports.updateUser = async (req, res, next) => {
  try {
    await User.updateOne({_id: req.params.user}, req.body, (error, user) => {
      if (error) {
        res.status(httpStatus.BAD_REQUEST)
        res.send({ success: false, message: 'cannot update user', error })
      }

      if (user) {
        res.status(httpStatus.CREATED)
        res.send({ success: true, message: 'user updated successfully', data: req.body })
      }
    })
  } catch (error) {
    next(error)
  }
}
