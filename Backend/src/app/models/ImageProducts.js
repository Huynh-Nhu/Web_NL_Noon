const mongoose = require("mongoose");

const ImageProductsSchema = new mongoose.Schema({
  nameImageProduct: [],
});

module.exports = mongoose.model("ImageProduct", ImageProductsSchema);
