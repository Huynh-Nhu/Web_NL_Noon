const route = require('express').Router();

const orderController = require ('../app/controllers/OrderController');

route.use('/getOrderAdmin', orderController.getAllOrderAdmin)

route.use('/confirmOrder', orderController.confirmOrderSuccess)

route.use('/sendShipper', orderController.sendShipper)
route.use('/getOrderCustomer', orderController.getOrderCustomer)

route.use('/cancelOrder', orderController.CancelOrder)








module.exports = route;