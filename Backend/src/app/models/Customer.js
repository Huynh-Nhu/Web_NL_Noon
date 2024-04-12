const mongoose = require("mongoose");
const Address = require("./Address");

const customerScheme = new mongoose.Schema({
  nameCustomer: {
    type: String,
    required: true,
    maxLength: 20,
  },
  phoneCustomer: {
    type: String,
    // required: true,
    minlength: 1,
    maxlength: 11,
  },
  passwordCustomer: {
    type: String,
    // required: true,
    minlength: 1,
  },
  emailCustomer: {
    type: String,
    // required: true,
  },
  membershipLevel: {
    type: String,
    default: "membership",
  },
  idAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address,
  },
  avatarCustomer: {
    type: String,
    default:
      "https://res.cloudinary.com/defr8pudf/image/upload/v1709784674/Noon/z5144099427074_50065a08f86e0ebfd35a04d466d96b9b_yifonn.jpg",
  },
  
});

module.exports = mongoose.model("Customer", customerScheme);
