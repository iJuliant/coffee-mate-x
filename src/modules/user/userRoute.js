const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')
const { authentication, isAdmin } = require('../../middlewares/auth')
const userController = require('./userController')
const redisMiddleware = require('../../middlewares/redis')

Route.get(userController.getDataAll)
Route.get('/by-id/:id',
  redisMiddleware.getProductByIdRedis,
  userController.getDataById)
Route.patch(
  '/img/:id',
  authentication,
  isAdmin,
  uploadFile,
  userController.updateImage
)
Route.patch(
  '/delete-img/:id',
  authentication,
  isAdmin,
  uploadFile,
  userController.deleteImage
)
Route.patch(
  '/update-profile/:id',
  authentication,
  isAdmin,
  uploadFile,
  userController.updateData
)

module.exports = Route
