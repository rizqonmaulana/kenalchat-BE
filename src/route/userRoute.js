const router = require('express').Router()

const {
  registerUser,
  activateUser,
  loginUser,
  patchPassword
} = require('../controller/userController')

router.post('/register', registerUser)
router.patch('/active/:id', activateUser)
router.post('/login', loginUser)
router.patch('/change/password', patchPassword)

module.exports = router
