const helper = require('../helper/response')

const { postChat, getChatByRoom } = require('../model/chatModel')
const {
  createRoom,
  checkRoom,
  getRoomByUser
} = require('../model/chatRoomModel')

module.exports = {
  getChatByRoom: async (req, res) => {
    try {
      const { roomId } = req.body

      const result = await getChatByRoom(roomId)
      return helper.response(
        res,
        200,
        `Success get chat by room id ${roomId}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getRoomByUser: async (req, res) => {
    try {
      const { userId } = req.body

      const result = await getRoomByUser(userId)
      return helper.response(
        res,
        200,
        `Success get room by user id ${userId}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postChat: async (req, res) => {
    try {
      const { userIdFrom, userIdTo, chatContent } = req.body

      const check = await checkRoom(userIdFrom, userIdTo)

      let getRoom
      if (check.length === 0) {
        getRoom = Math.floor(Math.random() * Math.floor(999999999))

        let roomData = {
          room_id: getRoom,
          user_1: userIdFrom,
          user_2: userIdTo
        }
        await createRoom(roomData)

        roomData = {
          room_id: getRoom,
          user_1: userIdTo,
          user_2: userIdFrom
        }
        await createRoom(roomData)
      } else {
        getRoom = check[0].room_id
      }

      const setData = {
        room_id: getRoom,
        user_id_from: userIdFrom,
        user_id_to: userIdTo,
        chat_content: chatContent
      }

      const result = await postChat(setData)

      return helper.response(res, 200, 'Success post chat', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
