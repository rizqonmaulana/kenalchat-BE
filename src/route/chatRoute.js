const router = require('express').Router()

const {
  postChat,
  getChatByRoom,
  getRoomByUser,
  createRoom
} = require('../controller/chatController')

router.post('/get', getChatByRoom)
router.get('/:id', getRoomByUser)
router.post('/post', postChat)
router.post('/create/room', createRoom)

module.exports = router
