const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')
const authMiddleware = require('../../middlewares/auth')

const promoController = require('./promoController')

Route.get(
  '/',
  authMiddleware.authentication,
  promoController.getDataAll
)
Route.get(
  '/by-id/:id',
  authMiddleware.authentication,
  promoController.getDataById
)
Route.patch(
  '/img/:id',
  uploadFile,
  authMiddleware.authentication,
  promoController.updateImage)
Route.patch(
  '/update-promo/:id',
  uploadFile,
  authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  promoController.updateData)
Route.post(
  '/',
  uploadFile,
  authMiddleware.authentication,
  promoController.postPromo)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  // redisMiddleware.clearDataMovieRedis,
  promoController.deletePromo)

module.exports = Route
