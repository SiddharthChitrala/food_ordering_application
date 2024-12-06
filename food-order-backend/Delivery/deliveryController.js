const orderService = require('./deliveryService');

async function createOrder(req, res) {
  const { name,
    email,
    address,
    phone,
    totalMoney,
  cardNo,
orderDetails } = req.body;
  try {
    const newOrder = await orderService.createOrder(name,
      email,
      address,
      phone,
      totalMoney,
      cardNo,
orderDetails);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateOrder(req, res) {
  const orderId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedOrder = await orderService.updateOrder(orderId, updatedData);
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(deletedOrder);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
