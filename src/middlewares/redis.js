const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {

  getUserByIdRedis: (req, res, next) => {
    const { id } = req.decodeToken.user_id
    client.get(`getuser:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('fetching data from redis')
        return helper.response(
          res,
          200,
          'Success get data by id [redis]',
          JSON.parse(result)
        )
      } else {
        console.log('data not in redis')
        next()
      }
    })
  },

  getProductByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getproduct:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('fetching data from redis')
        return helper.response(
          res,
          200,
          'Success get data by id [redis]',
          JSON.parse(result)
        )
      } else {
        console.log('data not in redis')
        next()
      }
    })
  },

  getAllProductRedis: (req, res, next) => {
    client.get('getproducts', (error, result) => {
      if (!error && result != null) {
        console.log('fetching data from redis')
        return helper.response(
          res,
          200,
          'Success get data by id [redis]',
          JSON.parse(result)
        )
      } else {
        console.log('data not in redis')
        next()
      }
    })
  }

}
