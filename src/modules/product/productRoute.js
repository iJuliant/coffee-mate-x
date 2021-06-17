const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')
const productController = require('./productController')

Route.get(
  '/',
  productController.getDataAll)
Route.get(
  '/:id',
  productController.getDataById)
Route.patch(
  '/img/:id',
  uploadFile,
  productController.updateImage)

module.exports = Route
