const express = require('express');
const router = express.Router();
const authController = require('../auth/authController');
const orderController = require('../Orders/orderController');
const orderDeliveryController = require('../Delivery/deliveryController');

router.post('/login', authController.loginAuthControllerFn);
router.post('/register', authController.createAuthControllerFn);

router.post('/createOrder', orderController.createOrder);
router.get('/getOrders', orderController.getOrders);
router.get('/getOrder/:id', orderController.getOrderById);
router.put('/updateOrder/:id', orderController.updateOrder);
router.delete('/deleteOrder/:id', orderController.deleteOrder);

router.post('/createDelivery', orderDeliveryController.createOrder);
router.get('/getDelivery', orderDeliveryController.getOrders);
router.get('/getDelivery/:id', orderDeliveryController.getOrderById);
router.put('/updateDelivery/:id', orderDeliveryController.updateOrder);
router.delete('/deleteDelivery/:id', orderDeliveryController.deleteOrder);

module.exports = router;
