const Order = require("../models/Order");
const Products = require("../models/Products");
const moment = require("moment");

class OrderService {
  async getAll() {
    try {
      const order = await Order.find()
        .populate("idUser")
        .populate("idStaff")
        .populate("idShipper")
        .populate("idOrderDetail")
        .sort({ _id: -1 })
        .exec();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOrderCustomer(id) {
    try {
      const order = await Order.find({ idUser: id })
        .populate("idOrderDetail")
        .populate({
          path: "idUser",
          select: "-passwordCustomer",
          populate: {
            path: "idAddress",
          },
        })
        .sort({ _id: -1 })
        .exec();

      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async Cancel(id) {
    try {
      const order = await Order.findByIdAndUpdate(
        id,
        {
          status: "Hủy đơn",
        },
        {
          new: true,
        }
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async revenueTotal() {
    try {
      const order = await Order.aggregate([
        {
          $match: {
            dayShip: { $ne: null },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalOrder" },
          },
        },
        
          {
            $project: {
              _id: 0,
              totalRevenue: 1,
            },
          },
        
        {
          $sort: { _id: 1 }
        }
      ]);
      const totalRevenue = order[0].totalRevenue;
      return totalRevenue;
    } catch (error) {
      console.log(error);
    }
  }

  async totalDaily() {
    try {
      const dayNow = new Date();
      dayNow.setHours(0, 0, 0, 0);
      const order = await Order.aggregate([
        {
          $match: {
            dayShip: {
              $gte: dayNow,
              $lt: new Date(dayNow.getTime() + 24 * 60 * 60 * 1000),
            },
            status: "Đã giao hàng",
          },
        },
        {
          $group: {
            _id: null,
            tongThu: { $sum: "$totalOrder" },
          },
        },
      ]).exec();
    
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async totalWeekly(numDays) {
    try {
      const dailyRevenueResults = [];

      for (let i = numDays - 1; i >= 0; i--) {
        const currentDate = moment().subtract(i, "days");

        const startOfDay = currentDate.startOf("day").toDate();
        const endOfDay = currentDate.endOf("day").toDate();

        const order = await Order.aggregate([
          {
            $match: {
              dayShip: {
                $gte: startOfDay,
                $lt: endOfDay,
              },
              status: "Đã giao hàng",
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalOrder" },
            },
          },
        ]).exec();

        const dailyRevenue = order.length > 0 ? order[0].totalRevenue : 0;

        const formattedDate = currentDate.format("MMMM Do");

        const dailyRevenueResult = {
          Day: formattedDate,
          Price: dailyRevenue,
        };

        dailyRevenueResults.push(dailyRevenueResult);
      }

      return dailyRevenueResults;
    } catch (error) {
      console.log(error);
    }
  }

  async orderedShip() {
    try {
      const dayNow = new Date();
      dayNow.setHours(0, 0, 0, 0);

      const order = await Order.aggregate([
        {
          $match: {
            dayShip: {
              $gte: dayNow,
              $lt: new Date(dayNow.getTime() + 24 * 60 * 60 * 1000),
            },
            status: "Đã giao hàng",
          },
        },
        {
          $group: {
            _id: null,
            orderShip: { $sum: 1 }, // Tính tổng số hóa đơn đã giao hàng
          },
        },
      ]).exec();

      const totalOrders = order.length > 0 ? order[0].orderShip : 0;
      return totalOrders;
    } catch (error) {
      console.log(error);
    }
  }

  async revenue() {
    try {
      const order = await Order.aggregate([
        {
          $match: {
            dayShip: { $ne: null },
          },
        },
        {
          $group: {
            _id: { $month: "$dayShip" },
            doanhSoThang: { $sum: "$totalOrder" },
          },
          
        },
        {
          $project: {
            _id: 0,
            month: {
              $let: {
                vars: {
                  months: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                },
                in: { $arrayElemAt: ["$$months", { $subtract: ["$_id", 1] }] },
              },
            },
            doanhSoThang: 1,
          },
        },
        {
          $sort: { month: 1 }
        }
      ]);
      return order;
    } catch (error) {
      console.log(error);
    }
  }

  async selectRevenue(startDate, endDate) {
    try {
      const orders = await Order.aggregate([
        {
          $match: {
            dayShip: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d-%m-%Y", date: "$dayShip" } },
            totalRevenue: { $sum: "$totalOrder" },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            totalRevenue: 1,
          },
        },
      ]);

      if (orders.length > 0) {
        const revenueArray = orders.map((order) => ({
          date: order.date,
          totalRevenue: order.totalRevenue,
        }));
        const totalRevenue = orders.reduce(
          (sum, order) => sum + order.totalRevenue,
          0
        );
        return { totalRevenue, revenueArray };
      } else {
        console.log("No orders found within the specified date range.");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async revenueQuester() {
    try {
      const order = await Order.aggregate([
        {
          $match: {
            dayShip: { $ne: null },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$dayShip" },
              quarter: { $ceil: { $divide: [{ $month: "$dayShip" }, 3] } },
            },
            doanhSoQuy: { $sum: "$totalOrder" },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            quarter: "$_id.quarter",
            doanhSoQuy: 1,
          },
        },
        {
          $addFields: {
            startMonth: {
              $subtract: [{ $multiply: ["$quarter", 3] }, 2],
            },
            endMonth: {
              $multiply: ["$quarter", 3],
            },
          },
        },
        {
          $sort: { year: 1, quarter: 1 },
        },
        {
          $project: {
         
            monthRange: {
              $concat: [
                { $toString: '$startMonth' },
                '/',
                { $toString: '$year' },
                ' - ',
                { $toString: '$endMonth' },
                '/',
                { $toString: '$year' },

              ]
            },
            doanhSoQuy: 1,
          },
        },
        
      ]);

      return order;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OrderService();
