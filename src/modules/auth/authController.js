require('dotenv').config()
const authModel = require('./authModel')
const bcrypt = require('bcrypt')
const helper = require('../../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {

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
