const mongoose = require('mongoose');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter user name']
    },

    password: {
        type: String,
        required: [true, 'You must enter password'],
        minLenght: [8, 'Your password must be at least 8 characters long'],
        select: false // Hide this field (password) when requesting user information
    },

    role: {
        type: String,
        enum: {
            values: ['user', 'operator'],
            message: 'You must choose user role (user, operator)'
        },
        default: 'user'
    }
});

// Encrypt password
userSchema.pre('save', async function(next) {

    // Do not modify password if user name is only updated
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Create web token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Compare given user password when login
userSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('user', userSchema);