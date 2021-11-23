const restaurant = require('../models/restaurant');

// Export this getRestaurants method to router.
// Get all restaurants => /api/v1/restaurants
exports.getRestaurants = async (req, res, next) => {
    const restaurants = await restaurant.find();

    // HTTP status code 200 = OK "The request has succeeded"
    res.status(200).json({
        success: true,
        results: restaurants.length,
        data: restaurants
    });
};