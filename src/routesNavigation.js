const router = require('express').Router()
const user = require('./route/userRoute')

router.use('/user', user)

module.exports = router
