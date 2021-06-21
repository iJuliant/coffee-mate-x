const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const userModel = require('./userModel')
// const nodemailer = require('nodemailer')
const fs = require('fs')

require('dotenv').config()

module.exports = {
  getDataAll: async (req, res) => {
    try {
      const result = await userModel.getDataAll()
      if (result.length > 0) {
        // client.set(`getUserid:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data All', result)
      } else {
        return helper.response(res, 404, 'Failed! No Data')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_image: req.file ? req.file.filename : '',
        user_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await userModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].user_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await userModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Updated')
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  deleteImage: async (req, res) => {
    try {
      const { id } = req.params
      const dataToUpdate = await userModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].user_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const setData = {
          user_image: '',
          user_updated_at: new Date(Date.now())
        }
        const result = await userModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Delete Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Updated')
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getDataById(id)
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
  updateData: async (req, res) => {
    try {
      const { id } = req.params
      const getDataId = await userModel.getDataById(id)
      // console.log(getDataId[0])
      let {
        userDisplay,
        userEmail,
        userName,
        userPhone,
        userAddress,
        userGender,
        userBirth
      } = req.body
      console.log(req.body)
      if (userName === '') {
        userName = getDataId[0].user_name
      }
      if (userEmail === '') {
        userEmail = getDataId[0].user_email
      }
      if (userPhone === '') {
        userPhone = getDataId[0].user_phone
      }
      if (userDisplay === '') {
        userDisplay = getDataId[0].user_display_name
      }
      if (userAddress === '') {
        userAddress = getDataId[0].user_address
      }
      if (userGender === 'Male') {
        userGender = 'Male'
      }
      if (userGender === 'Female') {
        userGender = 'Female'
      }
      if (userBirth === '') {
        userBirth = getDataId[0].user_birth
      }

      const setData = {
        user_name: userName,
        user_display_name: userDisplay,
        user_phone: userPhone,
        user_address: userAddress,
        user_gender: userGender,
        user_birth: userBirth,
        user_updated_at: new Date(Date.now())
      }
      if (getDataId.length > 0) {
        const result = await userModel.updateData(setData, id)
        return helper.response(
          res,
          200,
          `Success Update Data by id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data by id ${id}, not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error)
    }
  },
  updatePasswordUser: async (req, res) => {
    try {
      const { id } = req.params
      const { userNewPassword, userConfirmPassword } = req.body
      if (userNewPassword === '' || userConfirmPassword === '') {
        return helper.response(res, 401, 'Please input field!')
      } else {
        const checkPassword = await userModel.getDataById(id)
        const comparePassword = bcrypt.compareSync(
          userNewPassword,
          checkPassword[0].user_password
        )
        // console.log(checkPassword, comparePassword)
        if (comparePassword) {
          return helper.response(
            res,
            401,
            'Can not change, new password same with old password. Please enter different input !'
          )
        } else {
          const salt = bcrypt.genSaltSync(10)
          const encryptPassword = bcrypt.hashSync(userNewPassword, salt)
          if (userNewPassword !== userConfirmPassword) {
            return helper.response(
              res,
              401,
              'New Password and Confirm Password not same, please check again!'
            )
          } else {
            const setData = {
              user_password: encryptPassword
            }
            const result = await userModel.updateData(setData, id)
            delete result.user_password
            console.log('Success Change Password !')
            return helper.response(res, 200, 'Success Change Password', result)
          }
        }
      }
    } catch (error) {
      // console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
