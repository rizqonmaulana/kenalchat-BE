const helper = require('../helper/response')

const {
  getFriendFrom,
  getFriendTo,
  checkFriendRequest,
  addFriend,
  confirmFriend,
  deleteFriend
} = require('../model/friendModel')

const { getUserById } = require('../model/userModel')

module.exports = {
  getFriendList: async (req, res) => {
    try {
      const { userId } = req.body
      console.log(userId)

      const data1 = await getFriendFrom(userId)
      const data2 = await getFriendTo(userId)

      const result = data1.concat(data2)

      return helper.response(res, 200, 'Get friend list', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.body

      const setData = {
        user_id: userId,
        user_friend_id: friendId
      }

      const result = await addFriend(setData)
      let friend = await getUserById(friendId)
      friend = friend[0].user_name
      return helper.response(
        res,
        200,
        `${friend} added to your friend list`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  checkFriendRequest: async (req, res) => {
    try {
      const { userIdFrom, userIdTo } = req.body

      const data = {
        userIdFrom,
        userIdTo
      }

      let status = 1
      const check1 = await checkFriendRequest(data, status)
      if (check1.length > 0) {
        return helper.response(res, 200, 'friend')
      }

      status = 0
      const check0 = await checkFriendRequest(data, status)
      if (check0.length > 0) {
        return helper.response(res, 200, 'friend requested')
      } else {
        return helper.response(res, 200, 'add friend')
      }
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
