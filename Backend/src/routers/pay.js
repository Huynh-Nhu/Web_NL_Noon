const route = require('express').Router();

const payController = require ('../app/controllers/PayController');

route.use('/address', payController.addOrder)
route.use('/getAPIPaypal', payController.apiPaypal)
route.use('/capture', payController.capture)







module.exports = route;