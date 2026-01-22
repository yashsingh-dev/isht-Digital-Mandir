const mongoose = require('mongoose');

const adminModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    }
}, { timestamps: true });

module.exports = mongoose.model('admin', adminModel);