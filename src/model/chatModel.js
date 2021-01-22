const connection = require('../config/mysql')

module.exports = {
  postChat: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO chat SET ?', data, (error, result) => {
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
  getChatByRoom: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat WHERE room_id = ${id} ORDER BY chat_created_at ASC`,
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
  chatReadStatus: (roomId, userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE chat SET chat_status = 1 WHERE room_id = ${roomId} AND user_id_from != ${userId}`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
