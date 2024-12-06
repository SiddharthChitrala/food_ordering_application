const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  totalMoney: {
    type: String,
    required: true
  },
  cardNo: {
    type: String,
    required: true
  },
  orderDetails: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('Delivery', orderSchema);

module.exports = Order;
