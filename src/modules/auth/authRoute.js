const express = require('express')
const Route = express.Router()

const authController = require('./authController')

Route.post('/login', authController.login)

module.exports = Route
