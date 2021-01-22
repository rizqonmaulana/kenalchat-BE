const router = require('express').Router()

const {
  postChat,
  getChatByRoom,
  getRoomByUser
} = require('../controller/chatController')

router.get('/get', getChatByRoom)
router.get('/:id', getRoomByUser)
router.post('/post', postChat)

module.exports = router
