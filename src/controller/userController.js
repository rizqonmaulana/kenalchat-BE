const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const nodemailer = require('nodemailer')
const fs = require('fs')

const {
  registerUser,
  checkEmail,
  updatePassword,
  getUser,
  activateUser,
  patchUser
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
          'Duplicate Email, email has been used by another account or have registered but not active, please check your email to activate your account'
        )
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword,
        user_status: 0,
        user_created_at: new Date()
      }

      console.log(setData)

      const result = await registerUser(setData)

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_NAME, // generated ethereal user
          pass: process.env.MAIL_PASS // generated ethereal password
        }
      })
      const mailOptions = {
        from: '"Kenal Chat App" <kenalchatapp@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'kenal chat app - Activate your account', // Subject line
        html: `
        <p>Hello ${userName} please activate your account by click the link bellow</p>
        <a href=" http://localhost:3000/user/active/${result.user_id}">Click here activate your account</a>`
      }
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          return helper.response(res, 400, 'Email not send !')
        } else {
          console.log(info)
          return helper.response(res, 200, 'Email has been send !')
        }
      })

      return helper.response(
        res,
        200,
        'Success register user, please check your email to activate your account',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  activateUser: async (req, res) => {
    try {
      const { id } = req.params

      const result = await activateUser(id)
      return helper.response(
        res,
        200,
        'your account is already active, please login first',
        result
      )
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
  },
  patchUser: async (request, response) => {
    try {
      const { userEmail, userName, userPhone, userBio } = request.body

      let newPic
      const user = await checkEmail(userEmail)

      if (request.file === undefined) {
        newPic = user[0].user_pic
      } else {
        if (user[0].user_pic === null) {
          newPic = request.file.filename
        } else {
          newPic = request.file.filename
          fs.unlink(`./uploads/user/${user[0].user_pic}`, function (err) {
            if (err) throw err
            console.log('File deleted!')
          })
        }
      }

      const setData = {
        user_name: userName,
        user_pic: newPic,
        user_phone: userPhone,
        user_bio: userBio,
        user_updated_at: new Date()
      }

      const result = await patchUser(setData, userEmail)

      return helper.response(
        response,
        200,

        'Success update your profile ',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
