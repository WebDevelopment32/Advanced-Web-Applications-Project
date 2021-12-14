// Using nodem to have automatic server restart
// Nodemon was installed only on to dev. --save-dev
// "npm run dev" start server in development mode
// This was set up in package.json and config.env
// "npm run prod" start server in production mode

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

// Setting up config.env variables
dotenv.config({path: './config/config.env'});

// Handling uncought exception on event of it
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    // This is a developer caused error when the developer has made an programming mistake with not existing resourses
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
});

// Connecting to database
connectDatabase();

// Handle image upload
app.use(fileUpload());

// Setup body parser
app.use(express.json());

// Setup cookie parser
app.use(cookieParser());

// Importing routes
const restaurants = require('./routes/restaurantRouter');
const restaurantItem = require('./routes/restaurantItemRouter');
const user = require('./routes/userLoginRouter');

// For all routes, /api/v1/ will be added as middleware
// Used to save olf http calls and make old data safe
// If old data is used on frontend should the old call be used
// When changes are made to sertain route, it should become V2
app.use('/api/v1/', restaurants);
app.use('/api/v1/', restaurantItem);
app.use('/api/v1/', user);


// Handle unhandled routes in all routes
app.all('*',  (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`,  404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, ()=> {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handling unhandled promise rejection
// This error occurs when a critical error occurs (Database not found etc.)
process.on('unhandledRejection', err => {
    console.log(`Error ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close( () => {
        process.exit(1);
    });
});