const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    price: {
        type: Number,
        required: [true, 'Order price must be known']
    },

    items: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Item',
        required: [true, 'Order must have atleas one item']
    },

    orderTime: {
        type: Date,
        default: Date.now
    },
    
    deliveryTime: {
        type: String
    },

    status: {
        type: String,
        enum: {
            values: [
                'Received',
                'Preparing',
                'Ready for delivery',
                'Delivering',
                'Delivered'
            ]
        },
        default: 'Received'
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Orderer must be known']
    },

    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: [true, 'Order must be for a restaurant']
    }
});

module.exports = mongoose.model('Order', orderSchema);