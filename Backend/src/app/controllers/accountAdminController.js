const Customer = require("../models/Customer");
const Order = require("../models/Order");
const orderService = require("../services/orderService");
const moment = require("moment");

const AccountController = {
  account: async (req, res) => {
    try {
      const customer = await Customer.countDocuments();
      const order = await Order.countDocuments(); 
      const orderDaily = await orderService.totalDaily();
      const data = await orderService.totalWeekly(7);
      const orderShip = await orderService.orderedShip()
      const revenue = await orderService.revenue()
      const revenueQuarter= await orderService.revenueQuester()
      
      const revenueTotalShop = await orderService.revenueTotal()
      return res.status(200).json({ customer, orderDaily, data, order , orderShip , revenue, revenueQuarter, revenueTotalShop});
    } catch (error) {
      console.log(error);
    }
  },
  revenueSelectDay: async (req, res) => {
    try {
      const {startDay, endDay} = req.body;
      const orderRevenue = await orderService.selectRevenue(startDay, endDay)
      return res.status(200).json({orderRevenue})
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = AccountController;
