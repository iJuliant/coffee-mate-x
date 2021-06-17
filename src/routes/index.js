const express = require('express')
const Router = express.Router()

const authRoutes = require('../modules/auth/authRoute')

// Router.use('/', (req, res) => {
//   res.send('Hello World')
// })
Router.use('/auth', authRoutes)

module.exports = Router
