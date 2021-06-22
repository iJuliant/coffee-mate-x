const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middlewares/auth')
const orderController = require('./orderController')

Route.get(
  '/',
  (req, res) => {
    res.send('hello world')
  }
)

Route.post(
  '/',
  authMiddleware.authentication,
  // authMiddleware.isAdmin,
  orderController.postOrder
)

Route.patch(
  '/update/:id',
  authMiddleware.authentication,
  orderController.updateOrder
)

module.exports = Route
