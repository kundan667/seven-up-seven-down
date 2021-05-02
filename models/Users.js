const mongoose = require("mongoose");

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points:{
        type: Number,
        required: true,
        default: 5000
    }
});

module.exports = mongoose.model('users', user);