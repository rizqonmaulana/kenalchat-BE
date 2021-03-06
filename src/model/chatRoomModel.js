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
  },
  getRoomByUser: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM chat_room JOIN user ON chat_room.user_2 = user.user_id WHERE user_1 = ${userId} ORDER BY room_updated_at DESC`,
        (error, result) => {
          if (!error) {
            resolve(result)
          } else {
            console.log(error)
            reject(error)
          }
        }
      )
    })
  },
  updateRoom: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE chat_room SET room_updated_at = current_timestamp() WHERE room_id = ${roomId}`,
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
