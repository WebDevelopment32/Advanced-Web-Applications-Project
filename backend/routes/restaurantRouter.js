const express = require('express');
const router = express.Router();

// Import restaurants controller methods
const {
    getRestaurants,
    newRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    uploadImage
} = require('../controllers/restaurantsController');

// Authorization functions
const {
    isUserAuthenticated,
    isUserRoleAuthorized
} = require('../middlewares/authenticator');

// Passing route to route HTTP calls and defining the call method type and giving it the controller method
router.route('/restaurants').get(getRestaurants);
router.route('/restaurant/:id').get(getRestaurant);

router.route('/restaurant/new').post(isUserAuthenticated, isUserRoleAuthorized('user'), newRestaurant);
router.route('/restaurant/update/:id').put(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), updateRestaurant);
router.route('/restaurant/uploadimg/:id').put(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), uploadImage);

router.route('/restaurant/delete/:id').delete(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), deleteRestaurant);

module.exports = router;