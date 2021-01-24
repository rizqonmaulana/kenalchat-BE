const router = require('express').Router()

const {
  getFriendList,
  addFriend,
  deleteFriend
} = require('../controller/friendController')

router.post('/all', getFriendList)
router.post('/add', addFriend)
router.delete('/delete', deleteFriend)

module.exports = router
