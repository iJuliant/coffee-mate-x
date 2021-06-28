require('dotenv').config()
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = process.env.DB_PORT
const routerNavigation = require('./routes')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(compression())
app.use(cors())
app.options('*', cors()) // all access cors.
app.use(helmet())
app.use(morgan('dev'))

app.get("/", (req, res) => {
  res.send('Hello world')
})

app.use('/backend5/api/v1', routerNavigation)
app.use('/backend5/api', express.static('src/uploads'))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
