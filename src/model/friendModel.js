const connection = require('../config/mysql')

module.exports = {
  getFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT friend.user_friend_id, user.user_name, user.user_email, user.user_pic FROM friend JOIN user ON friend.user_friend_id = user.user_id WHERE friend.user_id = ${id}`,
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
  checkFriendRequest: (data, status) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM friend WHERE user_id_from = ${data.userIdFrom} AND user_id_to = ${data.userIdTo} AND friend_status = ${status}`,
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
  confirmFriend: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE friend SET friend_status = 1 WHERE friend_id = ${id}`,
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
