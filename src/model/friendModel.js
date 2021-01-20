const connection = require('../config/mysql')

module.exports = {
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
          console.log(error)
          reject(new Error(error))
        }
      })
    })
  },
  confirmFriend: (id) => {
    return new Promise((resolve, reject) => {
      console.log(
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
      )
    })
  }
}
