const router = require('express').Router()

const {
  postChat,
  getChatByRoom,
  getRoomByUser
} = require('../controller/chatController')

router.get('/:id', getRoomByUser)
router.get('/get', getChatByRoom)
router.post('/post', postChat)

module.exports = router
