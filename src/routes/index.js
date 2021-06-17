const express = require('express')
const Router = express.Router()

const authRoutes = require('../modules/auth/authRoute')
const userRoutes = require('../modules/user/userRoute')
const productRoutes = require('../modules/product/productRoute')

// Router.use('/', (req, res) => {
//   res.send('Hello World')
// })
Router.use('/auth', authRoutes)
Router.use('/user', userRoutes)
Router.use('/product', productRoutes)

module.exports = Router
