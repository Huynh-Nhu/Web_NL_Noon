const { response } = require("express");
const authService = require("../services/authService");
const shipperService = require("../services/shipperService");
const Products = require("../models/Products");
const Order = require("../models/Order");

const ShipperController = {
  getShipper: async (req, res) => {
    try {
      const shipper = await authService.findShipper();
      return res.status(200).json(shipper);
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (req, res) => {
    try {
      const { idShipper } = req.body;
      const order = await shipperService.getOrderShipper(idShipper);
      // console.log(order);
      const updateSendShipper = [];
      for (const item of order) {
        const orderDetail = item.idOrderDetail.orderDetail;
        const updateProductDetail = [];
        for (const product of orderDetail) {
          const products = await Products.findById(product.ipProduct).populate(
            "idProductDetails"
          );
          const detail = products.idProductDetails.sizeProducts;
          const size = detail.find(
            (size) => size._id.toString() === product.idProductSize.toString()
          );

          const updatedItem = {
            idProduct: {
              size: size.size,
              price: size.price,
              img: size.img,
              quantity: size.quantity,
              state: size.state,
              priceOrder: product.priceOrder,
              quantityOrder: product.quantityOrder,
            },
            nameProduct: products.nameProduct,
          };
          updateProductDetail.push(updatedItem);
        }

        const updateProduct = {
          ...item.toObject(),
          orderDetail: updateProductDetail,
        };

        const fieldsToRemove = [
          "dayCurrent",
          "idShipper",
          "idStaff",
          "idOrderDetail",
        ];

        fieldsToRemove.forEach((field) => {
          if (field in updateProduct) {
            delete updateProduct[field];
          }
        });
        updateSendShipper.push(updateProduct);
      }

      return res.status(200).json(updateSendShipper);
    } catch (error) {
      console.log(error);
    }
  },

  shipOrder: async (req, res) => {
    try {
      const { idOrder } = req.body;
      const order = await Order.findByIdAndUpdate(
        idOrder,
        {
          status: "Đã giao hàng",
          dayShip: new Date().toISOString(),
        },
        {
          new: true,
        }
        );
        return res.status(200).json({message: "Giao hàng thành công", order: order});
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = ShipperController;
