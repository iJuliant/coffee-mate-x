const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')

const promoController = require('./promoController')

Route.get(
  '/:id',
  promoController.getDataById)
Route.patch(
  '/img/:id',
  uploadFile,
  promoController.updateImage)
Route.patch(
  '/ling/lung/:id',
  uploadFile,
  // authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  promoController.updateData)
Route.post(
  '/',
  uploadFile,
  promoController.postPromo)

module.exports = Route
