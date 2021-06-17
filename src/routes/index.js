const express = require('express')
const Router = express.Router()

Router.use('/', (req, res) => {
  res.send('Hello World')
})

module.exports = Router
