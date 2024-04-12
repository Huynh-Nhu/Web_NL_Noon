const mongoose = require("mongoose");
const Brand = require("./Brand");

const categorySchema = new mongoose.Schema({
  codeBrand: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Brand,
    },
  ],
  nameCategory: {
    type: String,
    required: true,
  },
  categoryDetails: [
    
  ],
  imgCategory: []
});

  module.exports = mongoose.model("Category", categorySchema);
