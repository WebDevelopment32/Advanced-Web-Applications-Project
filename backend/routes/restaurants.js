const express = require('express');
const router = express.Router();

// Import restaurants controller methods
const {
    getRestaurants
} = require('../controllers/restaurantsController');

// Passing route to route HTTP calls and defining the call method type and giving it the controller method
router.route('/restaurants').get(getRestaurants);

module.exports = router;