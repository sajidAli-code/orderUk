const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'food_categories',
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  introPara: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
