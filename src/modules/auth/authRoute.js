const authController = require('./authController')
const express = require('express')
const Route = express.Router()
// const uploadFile = require('../../middleware/uploads')

Route.post('/register', authController.register)
Route.post('/patch/verif/:id', authController.verificationUser)
Route.post('/login', authController.login)

module.exports = Route
