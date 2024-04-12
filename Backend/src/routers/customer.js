const router = require('express').Router();


const customerController = require('../app/controllers/customerController')

router.use('/register', customerController.registerCustomer )
router.use('/login', customerController.loginCustomer )
router.use('/google', customerController.googleCustomer )
router.use('/getAllCustomer', customerController.getAllCustomer )
router.use('/setPass', customerController.setPasswordCustomer )






module.exports = router;