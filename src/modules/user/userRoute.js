const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')

const userController = require('./userController')

Route.get(
  '/: id',
  userController.getDataById)
Route.patch(
  '/img/:id',
  uploadFile,
  userController.updateImage)
module.exports = Route
