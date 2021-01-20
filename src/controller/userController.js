const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

const {
  registerUser,
  checkEmail,
  updateUser,
  updatePassword,
  getUser
} = require('../model/userModel')

module.exports = {
  registerUser: async (req, res) => {
    try {
      const {
        userName,
        userEmail,
        userPassword,
        userConfirmPassword
      } = req.body

      if (userPassword !== userConfirmPassword) {
        return helper.response(res, 400, 'Password not match')
      }

      const check = await checkEmail(userEmail)
      if (check.length > 0) {
        return helper.response(
          res,
          400,
          'Duplicate Email, email has been used by another account'
        )
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_created_at: new Date()
      }

      console.log(setData)

      const result = await registerUser(setData)

      return helper.response(res, 200, 'Success register user', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  loginUser: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body

      const check = await checkEmail(userEmail)

      if (check.length > 0) {
        const passwordCheck = bcrypt.compareSync(
          userPassword,
          check[0].user_password
        )

        if (passwordCheck) {
          const {
            user_id: userId,
            user_name: userName,
            user_email: userEmail
          } = check[0]

          const payload = {
            userId,
            userName,
            userEmail
          }

          const token = jwt.sign(payload, 'PASSWORD', { expiresIn: '24h' })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Login success', result)
        } else {
          return helper.response(res, 400, 'wrong password')
        }
      } else {
        return helper.response(res, 400, 'Bad Request')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchPassword: async (req, res) => {
    try {
      const { userEmail, userPassword, userConfirmPassword } = req.body

      if (userPassword !== userConfirmPassword) {
        return helper.response(res, 400, 'Password not match')
      }

      const check = await checkEmail(userEmail)

      if (check.length === 0) {
        return helper.response(res, 400, 'user not found')
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_email: userEmail,
        user_password: encryptPassword
      }

      console.log(setData)

      const result = await updatePassword(setData)

      return helper.response(res, 200, 'Success update password', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
