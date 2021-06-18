require('dotenv').config()
const authModel = require('./authModel')
const bcrypt = require('bcrypt')
const helper = require('../../helpers/wrapper')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
// const fs = require('fs')

module.exports = {
  register: async (req, res) => {
    try {
      const { userPhone, userEmail, userPassword } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const checkEmail = await authModel.getDataCondition({
        user_email: userEmail
      })

      if (checkEmail.length > 0) {
        return helper.response(
          res,
          401,
          'Email is Registered',
          checkEmail[0].user_email
        )
      } else {
        const setData = {
          user_phone: userPhone,
          user_email: userEmail,
          user_password: encryptPassword
        }
        // console.log(setData)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
          }
        })

        const result = await authModel.register(setData)
        delete result.user_password

        const mailOption = {
          from: '"CoffeShop - Matte" <putericky@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: 'CoffeShop - Matte - Activation Email', // Subject line
          html: `<b>Click Here to activate your account</b><form action='http://localhost:3005/backend5/api/v1/auth/patch/verif/${result.id}' method="post">
          <button type="submit" name="your_name" value="your_value">Go</button>
      </form>` // html body
        }

        await transporter.sendMail(mailOption, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log(`Email Sent ${result.id}: ` + info.response)
          }
        })
        return helper.response(res, 200, `Success Register ${result.id}`, result)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  verificationUser: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        user_verified: '1'
      }
      const getUserId = await authModel.getUserDataConditions(id)
      await authModel.updateverifiedUser(setData, id)
      if (getUserId.length > 0) {
        return helper.response(res, 200, 'Succes User Verification')
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },

  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const isExist = await authModel.getDataCondition({ user_email: userEmail })

      if (isExist.length > 0) {
        const isMatch = bcrypt.compareSync(userPassword, isExist[0].user_password)

        if (isMatch) {
          const payLoad = isExist[0]
          delete payLoad.user_password
          const token = jwt.sign({ ...payLoad }, 'SECRET', { expiresIn: '24h' })
          const result = { ...payLoad, token }

          return helper.response(res, 200, 'Login succeed', result)
        } else {
          return helper.response(res, 401, 'Password mismatch')
        }
      } else {
        return helper.response(res, 404, 'Email not registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad request.', error)
    }
  }
}
