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
      console.log(error)
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
  },
  getCategory: async (req, res) => {
    // get data by category with pagination - all data stored in query
    try {
      let { page, limit, category, orderBy } = req.query

      page = page ? +page : page = 1
      limit = limit ? +limit : limit = 5
      if (!orderBy) {
        orderBy = 'ASC'
      }
      const totalData = await productModel.countData(category)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await productModel.getDataByCategory(category, limit, offset, orderBy)

      if (result.length === 0) {
        return helper.response(res, 404, `No data found for ${category}`)
      } else {
        return helper.response(res, 200, 'Success get data by category', result, pageInfo)
      }
    } catch (error) {
      console.log(req.query)
      console.log(error)
      return helper.response(res, 400, 'Bad request', error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.query

      const isExist = await productModel.getDataById(id)

      if (isExist.length === 0) {
        return helper.response(res, 404, 'Cannot delete empty data')
      } else {
        const result = await productModel.deleteProduct(id)

        return helper.response(res, 200, `Success delete product id ${id}`, result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request', error)
    }
  }
}
