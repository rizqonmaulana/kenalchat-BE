const connection = require('../config/mysql')

module.exports = {
  registerUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            user_id: result.insertId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  activateUser: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE user SET user_status = 1 WHERE user_id = ${id}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_name, user_email, user_pic WHERE user_email = '${email}'`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_name, user_email, user_pic FROM user WHERE user_id = '${id}'`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  },
  updatePassword: (setData) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          `UPDATE user SET user_password = '${setData.user_password}' WHERE user_email = '${setData.user_email}'`,
          (error, result) => {
            if (!error) {
              resolve(result)
            } else {
              reject(error)
            }
          }
        )
      )
    })
  },
  patchUser: (setData, email) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          'UPDATE user SET ? WHERE user_email = ?',
          [setData, email],
          (error, result) => {
            if (!error) {
              resolve(setData)
            } else {
              reject(new Error(error))
            }
          }
        )
      )
    })
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT user_id, user_name, user_email, user_phone, user_bio, user_pic FROM user WHERE user_email = '${email}'`,
        (error, result) => {
          console.log(error)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  checkEmailActive: (email) => {
    return new Promise((resolve, reject) => {
      console.log(
        connection.query(
          `SELECT user_id, user_name, user_email, user_password FROM user WHERE user_email = '${email}' AND user_status = 1`,
          (error, result) => {
            !error ? resolve(result) : reject(new Error(error))
          }
        )
      )
    })
  }
}
