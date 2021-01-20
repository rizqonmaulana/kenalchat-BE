const router = require('express').Router()

const { addFriend, confirmFriend } = require('../controller/friendController')

router.post('/add', addFriend)
router.patch('/confirm', confirmFriend)

module.exports = router
