'use strict'

const User = require('../../models/user')
const httpStatus = require('http-status')

exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findOneAndRemove({_id: req.params.user})
    if (deleted === null) {
      res.status(httpStatus.BAD_REQUEST)
      res.send({ success: false, message: 'cannot delete user', deleted })
    }

    res.status(httpStatus.CREATED)
    res.send({ success: true, message: 'user deleted successfully', data: req.params.user })
  } catch (error) {
    next(error)
  }
}
