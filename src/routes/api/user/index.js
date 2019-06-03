'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user')
const validator = require('express-validation')
const { create } = require('../../../validations/user.validation')
const auth = require('../../../middlewares/authorization')

router.post('/', auth(['admin']), validator(create), userController.createUser) // validate and creaate user

module.exports = router
