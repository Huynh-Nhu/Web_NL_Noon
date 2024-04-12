const mongoose = require("mongoose");

const ProductDetailsSchema = new mongoose.Schema({
  descriptionProducts: {
    type: String,
    required: true,
  },
  sizeProducts: [
    {
      size: String,
      price: String,
      img: String,
      quantity: String,
      state: { type: Boolean, default: true },
    },
  ],
  // stateProduct: {
  //   type: String,
  //   default: true,
  // },
});

module.exports = mongoose.model("ProductDetails", ProductDetailsSchema);
