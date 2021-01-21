const router = require('express').Router()

const { postChat } = require('../controller/chatController')

router.post('/post', postChat)

module.exports = router
