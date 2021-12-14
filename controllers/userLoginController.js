const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendTokenCookie = require('../utils/jwtTokenCookie');


// Register new user /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.create(req.body);
    sendTokenCookie(user, 200, res);
});

// Login user => /api/v1/user/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    if(!req.body.name || !req.body.password) {
        return next(new ErrorHandler('Pleas enter name and password', 400));
    }

    const name = req.body.name;

    // This should be email over user name
    // This function should return also over all the found
    //* users with this name and loop over untill the password matches
    // This implementation is only for this project
    const user = await User.findOne({name}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid user or password', 401));
    }

    const passwordMatch = await user.comparePasswords(req.body.password);

    if(!passwordMatch) {
        return next(new ErrorHandler('Invalid user or password', 401));
    }

    sendTokenCookie(user, 200, res);
});

// Logout user => /api/v1/user/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    // Null the cookie in prowser to disable user acces to protected
    //* calls untill re-login
    res.cookie('token', 'none', {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out'
    });
});