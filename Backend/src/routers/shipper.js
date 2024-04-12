const route = require('express').Router();

const shipperController = require ('../app/controllers/ShipperController');

route.use('/getShipper', shipperController.getShipper)
route.use('/getOrder', shipperController.getOrder)
route.use('/delivery', shipperController.shipOrder)










module.exports = route;