const helper = require('../../helpers/wrapper')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const productModel = require('./productModel')
// const fs = require('fs')

require('dotenv').config()

module.exports = {
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await productModel.getDataById(id)
      // client.set(`getUserid:${id}`, JSON.stringify(result))
      return helper.response(res, 200, `Success Get Data by id ${id}`, result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}
