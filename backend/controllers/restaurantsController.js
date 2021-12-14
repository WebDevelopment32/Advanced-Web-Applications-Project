const Restaurant = require('../models/restaurant');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const slugify = require('slugify');

// Export this getRestaurants method to router.
// Get all restaurants => /api/v1/restaurants
// Wrapping the async method inside catchAsyncErrors so that if error occures, it gets handles by the CAE method
exports.getRestaurants = catchAsyncErrors(async (req, res, next) => {
    const restaurants = await Restaurant.find();

    // HTTP status code 200 = OK "The request has succeeded"
    res.status(200).json({
        success: true,
        results: restaurants.length,
        data: restaurants
    });
});

/*  You could divide getRestaurants to 2 functions to save bandwith where
*   you have a function wich returns restaurants without image data
*   and a function wich does. With this small project i wont implement this */  

// Get a restaurant by id => /api/v1/restaurant/:id
exports.getRestaurant = catchAsyncErrors(async (req, res, next) => {
    const restaurantGet = await Restaurant.findById(req.params.id);

    console.log(restaurantGet)

    if(!restaurantGet) {
        return next(new ErrorHandler(`Restaurant by id: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success: true,
        data: restaurantGet
    });
});

// Create a new restaurant => /api/v1/restaurant/new
exports.newRestaurant = catchAsyncErrors(async (req, res, next) => {
    req.body.dataOwner = req.user.id;
    const restaurantNew = await Restaurant.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Restaurant created',
        data: restaurantNew
    });
});

// Upload image to restaurant by id => /api/v1/restaurant/uploadimg/:id
exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
    // Check if image is sent
    if(!req.files) {
        return next(new ErrorHandler('Image not uploaded!', 400));
    }

    const supportedFileTypes = /.png|.jpeg/;
    // Check if image file type is supported
    const fileType = req.files.image.mimetype;
    if(!supportedFileTypes.test(req.files.image.mimetype)) {
        return next(new ErrorHandler(`File type ${fileType.split('/')[1]} is not supported. Please upload image as png or jpeg`));
    }

    req.body.image = req.files.image;

    const restaurantGet = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!restaurantGet.image) {
        return next(new ErrorHandler('Uploading image to restaurant failed', 400));
    }

    res.status(200).json({
        success: true,
        message: `Image ${req.body.image.name} uploaded succesfully for restaurant ${restaurantGet.name}`
    });
});

// Update a restaurant by id => /api/v1/restaurant/update/:id
exports.updateRestaurant = catchAsyncErrors(async (req, res, next) => {
    let restaurantGet = await Restaurant.findById(req.params.id);

    if(!restaurantGet) {
        return next(new ErrorHandler(`Restaurant by id: ${req.params.id} not found!`, 404));
    }

    if(req.user.id !== restaurantGet.dataOwner.toString() || req.user.role !== 'admin') {
        return next(new ErrorHandler('Only restaurant owner or admin can delete this item'));
    }

    // Create a new slug if the restaurant name is being updated
    if(req.body.name) {
        req.body.slug = slugify(req.body.name, {lower: true});
    }

    restaurantGet = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select('-image.data');

    res.status(200).json({
        success: true,
        data: restaurantGet
    });
});

// Delete a job by id => /api/v1/restaurant/delete/:id
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
    let restaurantDelete = await Restaurant.findById(req.params.id);

    if(!restaurantDelete) {
        return next(new ErrorHandler(`Restaurant to delete by id: ${req.params.id} not found!`, 404));
    }

    console.log(req.user.role)

    if(req.user.id !== restaurantDelete.dataOwner.toString() && req.user.role !== 'admin') {
        return next(new ErrorHandler('Only restaurant owner or admin can delete this item'));
    }

    restaurantDelete = await Restaurant.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: `Restaurant with id: ${req.params.id} and name: ${restaurantDelete.name} deleted succesfully`
    });
});