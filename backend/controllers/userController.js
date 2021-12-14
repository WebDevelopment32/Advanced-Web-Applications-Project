const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');


// Get all users in db => /api/v1/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        results: users.length,
        data: users
    });
});

// Get all users with role user => /api/v1/users/user
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const role = 'user';
    const users = await User.find({role});

    res.status(200).json({
        success: true,
        results: users.lenght,
        data: users
    });
});

// Get all users with role operator => /api/v1/users/operator
exports.getOperators = catchAsyncErrors(async (req, res, next) => {
    const role = 'operator';
    const users = await User.find({role});

    res.status(200).json({
        success: true,
        results: users.lenght,
        data: users
    });
});

// Get user with id => /api/v1/user/find/:id
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User with id: ${req.params.id} not found`, 400));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// Get logged in user => /api/v1/user/loggedin
exports.getLoggedUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if(!user) {
        return next(new ErrorHandler(`User with id: ${req.params.id} not found`, 400));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// Update logged in user info => /api/v1/user/update
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    if(req.body.password) {
        return next(new ErrorHandler('Password can not be updated here', 400));
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: false // Do not run validation for password
    });

    if(!user) {
        return next(new ErrorHandler('User could not be updated'));
    }

    res.status(200).json({
        success: true,
        data: user
    });
});

// Delete currently logged in user => /api/v1/user/delete
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);

    if(!user) {
        return next(new ErrorHandler('Could not delete user'));
    }

    res.cookie('token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User deleted succesfully'
    });
});