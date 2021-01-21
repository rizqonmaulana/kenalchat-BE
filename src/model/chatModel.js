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
  }
}
