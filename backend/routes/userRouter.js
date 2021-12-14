const express = require('express');
const router = express.Router();

// Import user handling methods
const {
    getAllUsers,
    getUsers,
    getOperators,
    getUser
} = require('../controllers/userController');

const {
    isUserAuthenticated,
    isUserRoleAuthorized
} = require('../middlewares/authenticator');

router.route('/users').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getAllUsers);
router.route('/users/user').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getUsers);
router.route('/users/operator').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getOperators);
router.route('/user/:id').get(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), getUser);

module.exports = router;