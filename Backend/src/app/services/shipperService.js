const Order = require("../models/Order");

class ShipperService {
  async getOrderShipper(id) {
    try {
      const order = await Order.find({ idShipper: id })
        .populate({
          path: "idUser",
          populate: { path: "idAddress" },
          select: "-passwordCustomer",
        })
        .populate("idOrderDetail")
        .sort({_id: -1})
        .exec();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new ShipperService();
