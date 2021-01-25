const router = require('express').Router()

const {
  postChat,
  getChatByRoom,
  getRoomByUser
} = require('../controller/chatController')

router.post('/get', getChatByRoom)
router.get('/:id', getRoomByUser)
router.post('/post', postChat)

module.exports = router
