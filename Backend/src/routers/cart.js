const route = require("express").Router();

const cardController = require("../app/controllers/CartController");

route.use("/getCart", cardController.getCart);
route.use("/deleteAll", cardController.deleteAllCart);

route.use("/delete", cardController.deleteCartItem);
route.use("/quantity", cardController.updateQuantity);
route.use("/add", cardController.addCart);




module.exports = route;
