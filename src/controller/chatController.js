const helper = require('../helper/response')

const {
  postChat,
  getChatByRoom,
  chatReadStatus,
  countUnreadMsg,
  getLastChat
} = require('../model/chatModel')
const {
  createRoom,
  checkRoom,
  getRoomByUser,
  updateRoom
} = require('../model/chatRoomModel')

module.exports = {
  getChatByRoom: async (req, res) => {
    try {
      const { roomId, userId } = req.body
      console.log(roomId)

      await chatReadStatus(roomId, userId)

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
      const { id } = req.params

      const result = await getRoomByUser(id)
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          result[i].unreadmessage = await countUnreadMsg(
            result[i].room_id,
            result[i].user_1
          )
          result[i].lastChat = await getLastChat(result[i].room_id)
        }
        if (result.length > 0) {
          return helper.response(
            res,
            200,
            `Success get room by user id ${id}`,
            result
          )
        } else {
          return helper.response(res, 400, 'not found')
        }
      }
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
          user_2: userIdTo,
          room_updated_at: new Date()
        }
        await createRoom(roomData)

        roomData = {
          room_id: getRoom,
          user_1: userIdTo,
          user_2: userIdFrom,
          room_updated_at: new Date()
        }
        await createRoom(roomData)
      } else {
        getRoom = check[0].room_id
      }

      const setData = {
        room_id: getRoom,
        user_id_from: userIdFrom,
        user_id_to: userIdTo,
        chat_content: chatContent,
        chat_status: 0
      }

      await chatReadStatus(getRoom, userIdFrom)
      const result = await postChat(setData)

      await updateRoom(getRoom)

      return helper.response(res, 200, 'Success post chat', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
