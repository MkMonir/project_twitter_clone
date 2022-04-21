const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/signin').post(authController.signIn);
router.route('/signout').get(authController.signout);

router.route('/:id').get(userController.getUser);

module.exports = router;
