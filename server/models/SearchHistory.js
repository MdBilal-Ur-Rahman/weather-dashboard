const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    temperature: {
        type: Number,
        required: true
    },

    searchedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);