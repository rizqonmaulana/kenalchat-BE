const router = require('express').Router()

const {
  registerUser,
  loginUser,
  patchPassword
} = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/change/password', patchPassword)

module.exports = router
