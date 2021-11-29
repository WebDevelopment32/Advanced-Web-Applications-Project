class ErrorHandler extends Error {
    constructor(message, statusCode) {
        // Super is a constructor of Error class
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;