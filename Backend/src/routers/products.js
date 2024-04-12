const route = require('express').Router();

const productController = require('../app/controllers/prouductController');
const router = require('./staff');

route.use('/product', productController.getAll)
route.use('/addProduct', productController.addProduct)
route.use('/getProductDetail', productController.getProductDetail)
route.use('/allProducts', productController.getAllProduct)
route.use('/updateProduct', productController.updateProduct)
route.use('/getBrandProduct', productController.getAllBrandOfProduct)
route.use('/deleteProduct', productController.deleteProduct)
route.use('/resetProduct', productController.resetProduct)
route.use('/deleteDetailProduct', productController.deleteDetailProduct)
route.use('/resetDetailProduct', productController.resetDetailProduct)





module.exports = route;