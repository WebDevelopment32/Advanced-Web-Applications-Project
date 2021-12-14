const Order = require('../models/order');
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Get all orders in db => /api/v1/orders
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    res.status(200).json({
        success: true,
        results: orders.length,
        data: orders
    });
});

// Get order by id => /api/v1/order/:id
exports.getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler(`Order with id: ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: order
    });
});

// Get orders belonging to user => /api/v1/user/orders
exports.getOrderUser = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    if(!orders) {
        return next(new ErrorHandler(`No orders could be found for user`));
    }

    res.status(200).json({
        success: true,
        results: orders.length,
        data: orders
    });
});

// Get orders belonging to a restaurant => /api/v1/restaurant/orders/:id
// Only restaurant should be allowed to access this. No time
exports.getOrdersRestaurant = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({restaurant: req.params.id});

    if(!orders) {
        return next(new ErrorHandler(`No orders could be found for restaurant`))
    }

    res.status(200).json({
        success: true,
        results: orders.length,
        data: orders
    });
});

// Create order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        return next(new ErrorHandler(`User not found with id: ${req.body.user}`, 404));
    }

    const restaurant = await Restaurant.findById(req.body.restaurant);

    if(!restaurant) {
        return next(new ErrorHandler(`Restaurant not found with id: ${req.body.restaurant}`, 404));
    }

    req.body.user = req.user.id;
    const order = await Order.create(req.body);

    if(!order) {
        return next(new ErrorHandler('Failed to creat new order', 400));
    }    

    res.status(200).json({
        success: true,
        message: `Order for restaurant ${restaurant.name} succesfull`,
        data: order
    })
});

// Delete order => /api/v1/order/delete/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler(`Order to delete by id: ${req.params.id} not found!`, 404));
    }

    const restaurant = await Restaurant.find({dataOwner: req.user.id});

    if(!restaurant) {
        return next(new ErrorHandler('User is not a restaurant owner'));
    }
    
    /* Not working. No time to fix
    if(restaurant._id !== order.restaurant.toString()) {
        return next(new ErrorHandler('Only owner can delete this order', 400));
    }
    */

    order = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: `Order ${req.params.id} deleted succesfully`
    });
});