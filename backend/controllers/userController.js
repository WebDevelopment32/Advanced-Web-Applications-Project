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

// Get user with id => /api/v1/user/:id
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

exports.updateUser

exports.deleteUser