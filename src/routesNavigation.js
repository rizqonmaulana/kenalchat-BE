const router = require('express').Router()
const user = require('./route/userRoute')
const friend = require('./route/friendRoute')
const chat = require('./route/chatRoute')
const { route } = require('./route/friendRoute')

router.use('/user', user)
router.use('/friend', friend)
router.use('/chat', chat)

module.exports = router
