const mongoose = require("mongoose");

const bet = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    betAmount: {
        type: Number,
        required: true
    },
    diceNo: {
        type: Number,
        required: true
    },
    win: {
        type: Boolean,
        default: true
    },
    amount: {
        type: Number,
        required: true
    },
    betNumber: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bets', bet);