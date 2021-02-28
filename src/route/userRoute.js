const router = require('express').Router()

const {
  registerUser,
  activateUser,
  loginUser,
  patchPassword,
  patchUser,
  getUserByEmail,
  forgotPassword,
  resetPassword
} = require('../controller/userController')
const uploadImage = require('../middleware/multer')

router.post('/register', registerUser)
router.patch('/active/:key', activateUser)
router.post('/login', loginUser)
router.patch('/change/password', patchPassword)
router.patch('/change/profile', uploadImage, patchUser)
router.get('/:email', getUserByEmail)
router.patch('/forgot', forgotPassword)
router.patch('/reset', resetPassword)

module.exports = router
