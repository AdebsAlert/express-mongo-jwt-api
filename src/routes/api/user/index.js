'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/user')
const validator = require('express-validation')
const { create, edit } = require('../../../validations/user.validation')
const auth = require('../../../middlewares/authorization')

router.post('/', auth(['admin']), validator(create), userController.createUser) // validate and create user
router.put('/:user', auth(), validator(edit), userController.updateUser) // validate and update user
router.delete('/:user', auth(['admin']), userController.deleteUser) // delete a user
router.get('/', auth(['admin']), userController.getUsers) // get all users
router.get('/:user', auth(), userController.getUser) // get a single user

module.exports = router
