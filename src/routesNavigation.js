const router = require('express').Router()
const user = require('./route/userRoute')
const friend = require('./route/friendRoute')

router.use('/user', user)
router.use('/friend', friend)

module.exports = router
