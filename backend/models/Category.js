const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    totalMeals: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('food_categories', categorySchema);
