const route = require('express').Router();

const accountController = require ('../app/controllers/accountAdminController');

route.use('/getAccount', accountController.account)
route.use('/revenueSelect', accountController.revenueSelectDay)






module.exports = route;