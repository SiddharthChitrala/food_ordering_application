const Order = require('./orderModel');

async function createOrder(dishName, dishPrice, dishQuantity) {
  try {
    const order = new Order({ dishName, dishPrice, dishQuantity });
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    throw new Error('Error creating order');
  }
}

async function getOrders() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    throw new Error('Error getting orders');
  }
}

async function getOrderById(orderId) {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error('Error getting order by ID');
  }
}

async function updateOrder(orderId, updatedData) {
  try {
    const order = await Order.findByIdAndUpdate(orderId, updatedData, { new: true });
    return order;
  } catch (error) {
    throw new Error('Error updating order');
  }
}

async function deleteOrder(orderId) {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    throw new Error('Error deleting order');
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
