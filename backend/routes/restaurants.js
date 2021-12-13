const express = require('express');
const router = express.Router();

// Import restaurants controller methods
const {
    getRestaurants,
    newRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurantsController');

// Passing route to route HTTP calls and defining the call method type and giving it the controller method
router.route('/restaurants').get(getRestaurants);
router.route('/restaurant/:id').get(getRestaurant);

router.route('/restaurant/new').post(newRestaurant);
router.route('/restaurant/update/:id').put(updateRestaurant);

router.route('/restaurant/delete/:id').delete(deleteRestaurant);

module.exports = router;