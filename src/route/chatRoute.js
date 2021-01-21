const router = require('express').Router()

const { postChat, getChatByRoom } = require('../controller/chatController')

router.get('/get', getChatByRoom)
router.post('/post', postChat)

module.exports = router
