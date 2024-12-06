const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  dishPrice: {
    type: Number,
    required: true,
  },
  dishQuantity: {
    type: Number,
    required: true,
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
