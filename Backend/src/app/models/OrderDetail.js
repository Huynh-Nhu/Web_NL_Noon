const { default: mongoose } = require("mongoose");
const Products = require("./Products");
const Order = require("./Order");

const OrderDetails = new mongoose.Schema({
  orderDetail: [
    {
      ipProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Products,
      },
      idProductSize: {
        type: String,
      },
      quantityOrder: {
        type: Number,
      },
      priceOrder: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("OrderDetails", OrderDetails);
