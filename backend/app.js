// Using nodem to have automatic server restart
// Nodemon was installed only on to dev. --save-dev
// "npm run dev" start server in development mode
// This was set up in package.json and config.env
// "npm run prod" start server in production mode

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// Setting up config.env variables
dotenv.config({path: './config/config.env'});

// Connecting to database
connectDatabase();

// Setup body parser
app.use(express.json);

// Importing routes
const restaurants = require('./routes/restaurants');

// For all routes, /api/v1/ will be added as middleware
// Used to save olf http calls and make old data safe
// If old data is used on frontend should the old call be used
// When changes are made to sertain route, it should become V2
app.use('/api/v1/', restaurants);

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`Server started on port ${process.env.PORT}`)
});