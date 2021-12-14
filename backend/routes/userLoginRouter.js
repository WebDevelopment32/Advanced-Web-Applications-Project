const express = require('express');
const router = express.Router();

// Import users login controller methods
const {
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/userLoginController');

router.route('/register').post(registerUser);
router.route('/user/login').post(loginUser);

router.route('/user/logout').get(logoutUser);

module.exports = router;