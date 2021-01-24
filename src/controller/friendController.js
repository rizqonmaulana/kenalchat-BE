const helper = require('../helper/response')

const {
  getFriend,
  checkFriend,
  addFriend,
  deleteFriend
} = require('../model/friendModel')

const { getUserById, checkEmailActive } = require('../model/userModel')

module.exports = {
  getFriendList: async (req, res) => {
    try {
      const { userId } = req.body

      const result = await getFriend(userId)

      return helper.response(res, 200, 'Get friend list', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  addFriend: async (req, res) => {
    try {
      const { userId, friendEmail } = req.body

      const checkEmail = await checkEmailActive(friendEmail)
      if (checkEmail.length === 0) {
        return helper.response(res, 400, 'user not found')
      }

      const friendId = checkEmail[0].user_id

      const setData = {
        user_id: userId,
        user_friend_id: friendId
      }

      let friend = await getUserById(friendId)
      friend = friend[0].user_name

      const check = await checkFriend(setData)

      if (check.length > 0) {
        return helper.response(res, 200, `You already friends with ${friend}`)
      }

      const result = await addFriend(setData)

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
