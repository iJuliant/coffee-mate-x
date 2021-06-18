const helper = require('../../helpers/wrapper')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const productModel = require('./productModel')
const fs = require('fs')

require('dotenv').config()

module.exports = {
  getDataAll: async (req, res) => {
    try {
      const result = await productModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Product', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await productModel.getDataById(id)
      // client.set(`getUserid:${id}`, JSON.stringify(result))
      if (result.length > 0) {
        // client.set(`getUserid:${id}`, JSON.stringify(result))
        return helper.response(res, 200, `Success Get Data by id ${id}`, result)
      } else {
        return helper.response(res, 404, `Failed! Data by id ${id} Not Found`)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  postProduct: async (req, res) => {
    try {
      const {
        productName,
        productPrice,
        productCategory,
        productDesc
      } = req.body
      const setData = {
        product_name: productName,
        product_base_price: productPrice,
        product_category: productCategory,
        product_desc: productDesc,
        product_updated_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await productModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Product', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        product_image: req.file ? req.file.filename : '',
        product_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await productModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].product_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await productModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Updated')
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}
