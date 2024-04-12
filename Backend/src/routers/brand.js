const route = require('express').Router();

const brandController = require ('../app/controllers/BrandController');

route.use('/add', brandController.addBrand)
route.use('/brandOne', brandController.getBrand)

route.use('/allBrand', brandController.getAllBrand)
route.use('/updateBrand', brandController.updateBrand)





module.exports = route;