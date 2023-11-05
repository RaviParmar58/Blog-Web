const express = require('express')
const { loginController } = require('../Controller/loginController')
const { signupController } = require('../Controller/signupController')
const { profileController } = require('../Controller/profileController.js')
const logoutController = require('../Controller/logoutController')
const { createnewpostController, getAllPostController, getPostController, deletePostController, editPostController } = require('../Controller/postController.js')
const { upload } = require('../Middleware/multer')
const userProfileController = require('../Controller/userController')
const router = express.Router()

router.post('/login', loginController)
router.post('/signup',  upload.single('userImage'), signupController)
router.get('/profile', profileController)
router.post('/logout', logoutController)
router.post('/createnewpost', upload.single('file'), createnewpostController)
router.get('/post', getAllPostController)
router.get('/post/:id', getPostController)
// router.get('/user/:id', userProfileController)
router.get('/user/post/:id', userProfileController)
router.delete('/delet-post/:id', deletePostController)
// router.delete('/edit-post/:id', editPostController)

module.exports = router