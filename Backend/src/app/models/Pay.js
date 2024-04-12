const { default: mongoose } = require("mongoose");

const Pay = new mongoose.Schema({
    methodPay: {
        type: String
    },
    status: {
        default: "Chưa thanh toán"
    }

})

module.exports = mongoose.model("Pay", Pay)