const helper = require('../helper/response')

const {
  getFriendFrom,
  getFriendTo,
  addFriend,
  confirmFriend,
  deleteFriend
} = require('../model/friendModel')

module.exports = {
  getFriendList: async (req, res) => {
    try {
      const { userId } = req.body
      console.log(userId)

      const data1 = await getFriendFrom(userId)
      const data2 = await getFriendTo(userId)

      const result = data1.concat(data2)

      console.log(result)
      //   return helper.response(res, 200, 'Get friend list', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  addFriend: async (req, res) => {
    try {
      const { userFrom, userTo } = req.body

      const setData = {
        user_id_from: userFrom,
        user_id_to: userTo,
        friend_status: 0
      }

      const result = await addFriend(setData)
      return helper.response(res, 200, 'Friend request sent', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  confirmFriend: async (req, res) => {
    try {
      const { friendId } = req.body

      const result = await confirmFriend(friendId)
      return helper.response(res, 200, 'Now you are friend', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const { friendId } = req.body

      const result = await deleteFriend(friendId)
      return helper.response(res, 200, 'You are now not a friend', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
