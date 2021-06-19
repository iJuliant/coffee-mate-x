const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')

const promoController = require('./promoController')

Route.get(
  '/',
  promoController.getDataAll
)
Route.get(
  '/by-id/:id',
  promoController.getDataById
)
Route.patch(
  '/img/:id',
  uploadFile,
  promoController.updateImage)
Route.patch(
  '/update-promo/:id',
  uploadFile,
  // authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  promoController.updateData)
Route.post(
  '/',
  uploadFile,
  promoController.postPromo)

module.exports = Route
