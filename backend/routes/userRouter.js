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

router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getUser);

router.route('/operator/users/user').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getUsers);
router.route('/operator/users/operator').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getOperators);

module.exports = router;