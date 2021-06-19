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
// Route.get(
//   '/by-product/:id/wu/:idd',
//   promoController.getDataByIdByCondition
// )
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
