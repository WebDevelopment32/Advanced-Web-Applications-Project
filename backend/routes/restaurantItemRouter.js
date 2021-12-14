const express = require('express');
const router = express.Router();

// Import item controller methods
const {
    newItem,
    getItems,
    getItem,
    uploadImage,
    updateItem,
    deleteItem,
    getRestaurantItems
} = require('../controllers/restaurantItemController');

// Authorization functions
const {
    isUserAuthenticated,
    isUserRoleAuthorized
} = require('../middlewares/authenticator');

router.route('/items').get(getItems);
router.route('/item/:id').get(getItem);
router.route('/restaurant/items/:id').get(getRestaurantItems);

router.route('/item/new/:id').post(isUserAuthenticated, isUserRoleAuthorized('user'), newItem);
router.route('/item/uploadimg/:id').put(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), uploadImage);
router.route('/item/update/:id').put(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), updateItem);

router.route('/item/delete/:id').delete(isUserAuthenticated, isUserRoleAuthorized('user', 'operator'), deleteItem);

module.exports = router;