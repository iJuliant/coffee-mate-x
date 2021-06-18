const express = require('express')
const Route = express.Router()
// const uploadFile = require('../../middleware/uploads')

const productController = require('./productController')

Route.get('/:id', productController.getDataById)

module.exports = Route
