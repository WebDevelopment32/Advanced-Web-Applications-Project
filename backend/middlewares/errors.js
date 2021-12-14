const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if(process.env.NODE_ENV === 'production') {
        let error = {...err};
        error.message = err.message;

        // Wrong mongoose Object ID Error
        // Occurs when resourse is not found (Wrong ID for item given in req)
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 404);
        }

        // Handling Mongoose Validation Error. Combining
        // Occurs when more than one or more resourses is not given in a req for schema
        // Related to Async error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT token
        if(err.name === 'JsonWebTokenError') {
            const message = 'Token is invalid. Please try again';
            error = new ErrorHandler(message, 500);
        }

        // Handling expired JWT token error
        if(err.name === 'TokenExpiredError') {
            const message = 'Token is expired. Please re-login';
            error = new ErrorHandler(message, 500);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error.'
        });
    }
}