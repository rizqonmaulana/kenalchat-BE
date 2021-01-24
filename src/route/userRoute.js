const router = require('express').Router()

const {
  registerUser,
  activateUser,
  loginUser,
  patchPassword,
  patchUser,
  getUserByEmail
} = require('../controller/userController')
const uploadImage = require('../middleware/multer')

router.post('/register', registerUser)
router.patch('/active/:id', activateUser)
router.post('/login', loginUser)
router.patch('/change/password', patchPassword)
router.patch('/change/profile', uploadImage, patchUser)
router.get('/:email', getUserByEmail)

module.exports = router
