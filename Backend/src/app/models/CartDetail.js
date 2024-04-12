const mongoose = require("mongoose");
const Cart = require("./Cart");
const Products = require("./Products");

const cartDetailSchema = new mongoose.Schema({
  idCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Cart,
  },
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Products,
  },
  idProductDetailSize: {
    type : String
  },
  quantityCart: {
    type: Number,
  },

  price: {
    type: Number,
  },
});

module.exports = mongoose.model("CartDetail", cartDetailSchema);
