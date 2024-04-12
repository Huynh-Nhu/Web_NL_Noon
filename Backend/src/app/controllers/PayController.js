const Address = require("../models/Address");
const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const ProductDetails = require("../models/ProductDetails");
const PaypalService = require("../services/paypal")
const Products = require("../models/Products");
const payController = {
  addOrder: async (req, res) => {
    try {
      const { idUser, address, phone , paymentOption , totalPrice } = req.body;
      const user = await Customer.findById(idUser).populate("idAddress");
      if (user.phoneCustomer === undefined) {
        user.phoneCustomer = phone;
        await user.save();
      }
      if (user.idAddress === undefined) {
        const newAddress = new Address({
          nameAddress: address,
        });

        const addAddressNew = await newAddress.save();

        (user.idAddress = addAddressNew._id), await user.save();
      }

      if (user.idAddress && user.idAddress.nameAddress !== address) {
        const filter = { nameAddress: user.idAddress.nameAddress };
        const update = { nameAddress: address };

        const updatedAddress = await Address.findOneAndUpdate(filter, update, {
          new: true,
        });

        if (updatedAddress) {
          console.log("Cập nhật địa chỉ khách hàng thành công");
        }
      }
      const cart = await Cart.find({ idUser: idUser }).populate("cartItems");
      const cartItem = cart[0].cartItems.map((item) => {
        return {
          ipProduct: item.idProduct,
          idProductSize: item.idProductDetailSize,
          quantityOrder: item.quantityCart,
          priceOrder: item.price,
        };
      });

      for (let i = 0; i < cartItem.length; i++) {
        const { idProductSize, quantityOrder } = cartItem[i];

        const productDetail = await ProductDetails.findOne({
          sizeProducts: { $elemMatch: { _id: idProductSize } },
        });
        if (productDetail) {
          const sizeProduct = productDetail.sizeProducts.find(
            (size) => size._id.toString() === idProductSize
          );

          if (sizeProduct) {
            if (sizeProduct.quantity >= quantityOrder) {
              sizeProduct.quantity -= quantityOrder;
              if (sizeProduct.quantity === "0") {
                sizeProduct.state = false;
              }

              await productDetail.save();
            } else {
              console.log("Số lượng trong kho không đủ");
              // res.json({message: "Số lượng trong kho không đủ"})
            }
          }
        }
      }

      const orderDetail = new OrderDetail({ 
        orderDetail: cartItem,
      });
      const orderDetailSave = await orderDetail.save();

      const newOrder = new Order({
        idUser: idUser,
        idStaff: null,
        payMethod: paymentOption,
        idOrderDetail: orderDetail._id,
        dayOrder: new Date().toISOString(),
        dayCurrent: null,
        dayShip: null,
        totalOrder: totalPrice
      });

      await newOrder.save();

      const cartIds = cart.map((item) => item._id);
      const id = cartIds.toString();
      return res.json({ message: "Đặt hàng thành công", id });
    } catch (error) {
      console.log(error);
    }
  },

  apiPaypal: async (req, res) => {
    try {
      
      const {jsonResponse, httpStatusCode} = await PaypalService.createOrder(req.body);
      res.status(httpStatusCode).json(jsonResponse)
      
    } catch (error) {
      console.log(error);
    }
  },
  capture: async (req, res) => { 
    try {
      const { orderID } = req.body;
      const { jsonResponse, httpStatusCode } = await PaypalService.captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  }
};

module.exports = payController;
