const { default: mongoose } = require("mongoose");
const Customer = require("./Customer");
const Staff = require("./Staff");
const CartDetail = require("./CartDetail");
const OrderDetail = require("./OrderDetail");
const Order = new mongoose.Schema({
    idUser: {
        type : mongoose.Schema.Types.ObjectId,
        ref: Customer
    },
    idStaff: {
        type : mongoose.Schema.Types.ObjectId,
        ref: Staff,
    },
    idOrderDetail:{
        type: mongoose.Schema.Types.ObjectId,
        ref: OrderDetail
    },
    idShipper: {
        type : mongoose.Schema.Types.ObjectId,
        ref: Staff,
    },
    dayOrder: {
        type: Date,
    },
    dayCurrent: {
        type: Date,
    },
    dayShip: {
        type: Date,
    },
    payMethod: {
        type: String,
    },
    totalOrder: {
        type: Number,
    },
    status: {  type: String,
        default: "Đang chờ xử lý"
    }

})

module.exports = mongoose.model("Order", Order);