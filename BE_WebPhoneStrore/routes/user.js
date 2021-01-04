const express = require('express')
const router = require("express-promise-router")()
const userController = require('../controllers/user')
const imageController = require('../controllers/image')

const passport = require('passport')
const { session } = require('passport')
require('../middlewares/passport')

router.route('/')
    .get(userController.getAllUser)
router.route('/find')
    .get(userController.findUserByPhone)
router.route('/api/auth/profile')
    .post(passport.authenticate('jwt', { session: false }), userController.returnUserByToken)
router.route('/authentication/activate/:tokenUser')
    .get(userController.activeAccount)
router.route('/signin')
    .post(passport.authenticate('local', { session: false }), userController.signIn)
router.route('/auth/google')
    .post(passport.authenticate('google-token', { session: false }), userController.authGoogle)
router.route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { session: false }), userController.authFacebook)
router.route('/signup')
    .post(userController.signUp)
router.route('/logout')
    .get(userController.logOut)
router.route('/change-pwd')
    .post(passport.authenticate('jwt', { session: false }), userController.changePassword)
router.route('/:userID')
    .get(userController.getUser)
    .put(userController.replaceUser)
    .delete(userController.deleteUser)

router.route('/image')
    .get(imageController.getAllImgUser)
    .post(imageController.uploadImageUser)

router.route('/image/:IDImage')
    .get(imageController.getImageUser)
module.exports = router