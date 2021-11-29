const restaurant = require('../models/restaurant');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Export this getRestaurants method to router.
// Get all restaurants => /api/v1/restaurants
// Wrapping the async method inside catchAsyncErrors so that if error occures, it gets handles by the CAE method
exports.getRestaurants = catchAsyncErrors(async (req, res, next) => {
    const restaurants = await restaurant.find();

    // HTTP status code 200 = OK "The request has succeeded"
    res.status(200).json({
        success: true,
        results: restaurants.length,
        data: restaurants
    });
});

// Use this error handling method in methods for single resourse if sertain resourse is not found
if(!restaurant || restaurant.length === 0) {
    return next(new ErrorHandler('Restaurant not found', 404));
}