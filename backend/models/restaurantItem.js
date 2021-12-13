const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const restaurantItemSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter item name'],
        trim: true,
        maxlength: [100, 'Restaurant name can not exeed 100 characters']
    },

    description: {
        type: String,
        required: [true, 'Item needs a description']
    },

    price: {
        type: Number,
        required: [true, 'Item needs to have a price']
    },

    image: {
        name: String,
        data: {
            type: Buffer
        }
    },

    category: {
        type: String,
        enum: {
            values: [
                'Pizza' // Add more items here
            ],
            message: 'Add categories for your food items'
        }
    },
    
    slug: String
});

restaurantItemSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

module.exports = mongoose.model('RestaurantItem', restaurantItemSchema);