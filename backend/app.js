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
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('files'));

// Security headers for http
app.use(helmet());

// Handle image upload
app.use(fileUpload());

// Setup body parser
app.use(express.json());

// Setup cookie parser
app.use(cookieParser());

// Block mongo query injections
app.use(mongoSanitize());

// Block script injections
app.use(xssClean());

// Block parameter pollution
app.use(hpp());

// Limit access rate
const limit = rateLimit({
    windowMs: 10*60*1000,
    max: 500
});

app.use(limit);

// Importing routes
const restaurants = require('./routes/restaurantRouter');
const restaurantItem = require('./routes/restaurantItemRouter');
const userLogin = require('./routes/userLoginRouter');
const user = require('./routes/userRouter');
const order = require('./routes/orderRouter');

// For all routes, /api/v1/ will be added as middleware
// Used to save olf http calls and make old data safe
// If old data is used on frontend should the old call be used
// When changes are made to sertain route, it should become V2
app.use('/api/v1/', restaurants);
app.use('/api/v1/', restaurantItem);
app.use('/api/v1/', userLogin);
app.use('/api/v1/', user);
app.use('/api/v1/', order);


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