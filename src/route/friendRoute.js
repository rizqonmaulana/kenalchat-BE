const router = require('express').Router()

const {
  addFriend,
  confirmFriend,
  deleteFriend
} = require('../controller/friendController')

router.post('/add', addFriend)
router.patch('/confirm', confirmFriend)
router.delete('/delete', deleteFriend)

module.exports = router
