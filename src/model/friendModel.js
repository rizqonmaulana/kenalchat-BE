const connection = require('../config/mysql')

module.exports = {
  getFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT friend.friend_id, friend.user_friend_id, user.user_name, user.user_email, user.user_pic FROM friend JOIN user ON friend.user_friend_id = user.user_id WHERE friend.user_id = ${id}`,
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
  checkFriend: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friend WHERE user_id = ${data.user_id} AND user_friend_id = ${data.user_friend_id}`,
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
  addFriend: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO friend SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            friend_id: result.insertedId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM friend WHERE friend_id = ${id}`,
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
