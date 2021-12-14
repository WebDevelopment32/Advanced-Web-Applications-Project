const express = require('express');
const router = express.Router();

// Import user handling methods
const {
    getAllUsers,
    getUsers,
    getOperators,
    getUser,
    getLoggedUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const {
    isUserAuthenticated,
    isUserRoleAuthorized
} = require('../middlewares/authenticator');

router.route('/users').get(getAllUsers);
router.route('/user/find/:id').get(getUser);

router.route('/operator/users/user').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getUsers);
router.route('/operator/users/operator').get(isUserAuthenticated, isUserRoleAuthorized('operator'), getOperators);
router.route('/user/loggedin').get(isUserAuthenticated, getLoggedUser);
router.route('/user/delete').delete(isUserAuthenticated, deleteUser);

router.route('/user/update').put(isUserAuthenticated, updateUser);

module.exports = router;