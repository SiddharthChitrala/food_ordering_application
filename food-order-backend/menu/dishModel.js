const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: String,
  description: String,
  price: Number,
  imagePath: String,
});

module.exports = mongoose.model('Dish', dishSchema);
