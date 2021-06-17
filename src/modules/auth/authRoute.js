const express = require('express')
const Route = express.Router()
// const uploadFile = require('../../middleware/uploads')

const authController = require('./authController')

Route.post('/register', authController.register)
Route.post('/patch/verif/:id', authController.verificationUser)

module.exports = Route
