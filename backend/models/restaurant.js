const mongoose = require('mongoose');
// Slug is a unicue identifier for the resource served by HTTP call
const slugify = require('slugify');
const validator = require('validator');

//Model
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String, // name is a string
        require: [true, 'Please enter restaurant name!'], // Restaurant must enter its name
        trim: true, // Get rid of blank spaces at the front and back of input
        maxlength: [100, 'Restaurant name can not exeed 100 characters']
    },

    address: {
        type: String,
        required: [true, 'Address is required']
    },

    city: {
        type: String
    },

    operatingHours: {
        type: String,
        required: [true, 'Operating hours required']
    },

    image: {
        name: String,
        data: {
            type: Buffer
        }
    },

    restaurantType: {
        type: String,
        enum: {
            values: [
                'Buffet',
                'Fast food',
                'Casual dining',
                'Fine dining'
            ],
            message: 'Please select correct option for restaurant type'
        }
    },

    priceLevel: {
        type: String,
        enum: {
            values: [
                '€',
                '€€',
                '€€€',
                '€€€€'
            ],
            message: 'Please select restaurants price level'
        }
    },

    slug: String,

    dataOwner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    company: {
        // If a real product, this field would be a must
        type: String
    },

    description: {
        type: String,
        maxlength: [1000, 'Description cannot exeed 1000 characters']
    },

    email: {
        // If a real product, this field would be a must
        type: String,
        validate: [validator.isEmail, 'You must add a valid email address']
    },

    phoneNumber: { 
        // If a real product, this field would be a must
        type: Number
    }
});

// Creating restaurant slug before saving to schema to DB
restaurantSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true /* Lower case the slug */});
    next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);