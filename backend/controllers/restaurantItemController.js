const RestaurantItem = require('../models/restaurantItem');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const slugify = require('slugify');

// Get all items in database => /api/v1/items
exports.getItems = catchAsyncErrors(async (req, res, next) => {
    const items = await RestaurantItem.find();

    res.status(200).json({
        success: true,
        results: items.length,
        data: items
    });
});

// Get item with with id => /api/v1/item/:id
exports.getItem = catchAsyncErrors(async (req, res, next) => {
    const item = await RestaurantItem.findById(req.params.id);

    console.log(item)

    if(!item) {
        return next(new ErrorHandler(`Item by id: ${req.params.id} not found!`));
    }

    res.status(200).json({
        success: true,
        data: item
    });
});

// Get items belonging to a restaurant by restaurant id => /api/v1/restaurant/items/:id
exports.getRestaurantItems = catchAsyncErrors(async (req, res, next) => {
    // This function must be build under 11 add restaurant item DB handling
});

// Create a new item => /api/v1/item/new
exports.newItem = catchAsyncErrors(async (req, res, next) => {
    const item = await RestaurantItem.create(req.body);

    res.status(200).json({
        success: true,
        message: 'Restaurant created',
        data: item
    });
});

// Upload image to item by id => /api/v1/item/uploadimg/:id
exports.uploadImage = catchAsyncErrors(async (req, res, next) => {
    if(!req.files) {
        return next(new ErrorHandler('Image not uploaded!', 400));
    }

    const supportedFileTypes = /.png|.jpeg/;
    if(!supportedFileTypes.test(req.files.image.mimetype)) {
        return next(new ErrorHandler(`File type ${req.files.image.mimetype} is not supported. Please upload image as png or jpeg`));
    }

    req.body.image = req.files.image;

    console.log(req.body.image)

    const item = await RestaurantItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!item.image) {
        return next(new ErrorHandler('Uploading image to item failed', 400));
    }

    res.status(200).json({
        success: true,
        message: `Image ${req.body.image.name} uploaded succesfully to item ${item.name}`
    });
});

// Upload item with id => /api/v1/item/update/:id
exports.updateItem = catchAsyncErrors(async (req, res, next) => {
    // Create a new slug if the item name is being updated
    if(req.body.name) {
        req.body.slug = slugify(req.body.name, {lower: true});
    }

    const item = await RestaurantItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select('-image.data');

    if(!item) {
        return next(new ErrorHandler(`Item by id: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success: true,
        data: item
    });
});

// Delete item with id => /api/v1/item/delete/:id
exports.deleteItem = catchAsyncErrors(async (req, res, next) => {
    const item = await RestaurantItem.findByIdAndDelete(req.params.id);

    if(!item) {
        return next(new ErrorHandler(`Restaurant to delete by id: ${req.params.id} not found!`, 404));
    }

    res.status(200).json({
        success: true,
        message: `Item with id: ${req.params.id} and name: ${item.name} deleted succesfully`
    });
});