const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, viewController.getOverview);
router.get('/register', viewController.getRegisterForm);
router.get('/signin', viewController.getSigninForm);

module.exports = router;
