const mongoose = require("mongoose");
const Customer = require("./Customer");

const cardSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Customer
    },
    priceCart: {
        type: Number,
    },
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartDetail"
    }]
});

  module.exports = mongoose.model("Cart", cardSchema);
