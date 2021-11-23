const mongoose = require('mongoose');
// Slug is a unicue identifier for the resource served by HTTP call
const slugify = require('slugify');
const validator = require('validator');

//Model
const restaurantSchema = new mongoose.Schema({
    // Name of the restaurant
    name: {
        type: String, // name is a string
        require: [true, 'Please enter restaurant name!'], // Restaurant must enter its name
        trim: true, // Get rid of blank spaces at the front and back of input
        maxlength: [100, 'Restaurant name can not exeed 100 characters']
    },

    slug: String,

    company: {
        type: String,
        required: [true, 'You must add the Company name']
    },

    description: {
        type: String,
        required: [true, 'You must enter description for your restaurant'],
        maxlength: [1000, 'Description cannot exeed 1000 characters']
    },

    email: {
        // If a real product, this field would be a must
        type: String,
        validate: [validator.isEmail, 'You must add a valid email address']
    },

    phoneNumber: { 
        type: String,
        required: [true, 'You must enter a phone number for customer support!']
    }
});

// Creating restaurant slug before saving to DB
restaurantSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true /* Lower case the slug */});
    next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);