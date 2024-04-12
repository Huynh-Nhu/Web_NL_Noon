const mongoose = require("mongoose");
const Category = require("./Category");
const ImageProducts = require("./ImageProducts");
const ProductDetails = require("./ProductDetails");

const productsSchema = new mongoose.Schema({
  idCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Category,
  },
  idImageProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ImageProducts,
  },
  idProductDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductDetails,
  },
  categoryDetailChosen: {
    type: String,
  },
  nameProduct: {
    type: String,
    required: true,
  },
  brandChonse: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productsSchema);
