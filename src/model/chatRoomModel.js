const connection = require('../config/mysql')

module.exports = {
  createRoom: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat_room SET ?', data, (error, result) => {
        if (!error) {
          console.log(result)
          resolve(result)
        } else {
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  checkRoom: (userIdFrom, userIdTo) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat_room WHERE user_1 = ${userIdFrom} AND user_2 = ${userIdTo}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
    })
  }
}
