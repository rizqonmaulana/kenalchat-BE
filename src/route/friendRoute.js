const router = require('express').Router()

const {
  getFriendList,
  addFriend,
  confirmFriend,
  deleteFriend
} = require('../controller/friendController')

router.get('/all', getFriendList)
router.post('/add', addFriend)
router.patch('/confirm', confirmFriend)
router.delete('/delete', deleteFriend)

module.exports = router
