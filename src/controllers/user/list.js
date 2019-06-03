'use strict'

const User = require('../../models/user')
const httpStatus = require('http-status')

exports.getUsers = async (req, res, next) => {
  try {
    const skip = req.query.skip != null ? parseInt(req.query.skip, 10) : 0
    const limit = req.query.limit != null ? parseInt(req.query.limit, 10) : 20

    const users = await User.find().skip(skip).limit(limit)

    if (!users) {
      res.status(httpStatus.BAD_REQUEST)
      res.send({ success: false, message: 'error fetching users', users })
    }

    res.status(httpStatus.CREATED)
    res.send({ success: true, message: 'users fetched successfully', data: users })
  } catch (error) {
    next(error)
  }
}
