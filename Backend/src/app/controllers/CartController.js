const Cart = require("../models/Cart");
const Customer = require("../models/Customer");
const CartDetail = require("../models/CartDetail");
const Products = require("../models/Products");
const ProductDetails = require("../models/ProductDetails");

const CardController = {
  addCart: async (req, res) => {
    try {
      const { carts } = req.body;
      let cart = await Cart.findOne({ idUser: carts.id_user });
      if (!cart) {
        cart = new Cart({
          idUser: carts.id_user,
          priceCart: 0,
          cartItems: [],
        });
      }

      let existingCartDetail = await CartDetail.findOne({
        idProductDetailSize: carts._id,
        idCart: cart._id,
      });

      if (existingCartDetail) {
        // Nếu CartDetail đã tồn tại trong giỏ hàng, cập nhật số lượng
        existingCartDetail.quantityCart += carts.quantity;
        await existingCartDetail.save();
      } else {
        let price = parseFloat(carts.price.replace(/,/g, ""));
        console.log(carts.price);
        // Nếu CartDetail chưa tồn tại trong giỏ hàng, tạo mới và thêm vào giỏ hàng
        existingCartDetail = new CartDetail({
          idCart: cart._id,
          idProduct: carts.id_product,
          quantityCart: carts.quantity,
          price: price,
          idProductDetailSize: carts._id,
        });

        await existingCartDetail.save();
        cart.cartItems.push(existingCartDetail);
      }

      let totalPrice = 0;
      for (const item of cart.cartItems) {
        const cartDetail = await CartDetail.findById(item);
        if (cartDetail) {
          const itemPrice = parseFloat(cartDetail.price);
          if (!isNaN(itemPrice)) {
            totalPrice += itemPrice;
          }
        }
      }

      // Cập nhật giá trị priceCart của giỏ hàng
      cart.priceCart = totalPrice.toFixed(3);

      // Lưu giỏ hàng đã cập nhật vào cơ sở dữ liệu
      await cart.save();
      return res.status(200).json({message: "Thêm thành công"})
    } catch (error) {
      console.log(error);
    }
  },

  getCart: async (req, res) => {
    try {
      const id = req.query.idUser;
      const getCart = await Cart.find({ idUser: id })
        .populate("cartItems")
        .exec();

      const productOnCart = []; // Khởi tạo mảng rỗng

      getCart.forEach((item) => {
        item.cartItems.forEach((it) => {
          productOnCart.push(it.idProduct);
        });
      });

      const cartProducts = await Products.find({
        _id: { $in: productOnCart },
      })
        .populate("idProductDetails")
        .exec();

      const CartSend = {
        ...getCart,
        Product: cartProducts,
      };

      // Object.assign(CartSend)
      return res.status(200).json(CartSend);
    } catch (error) {
      console.log(error);
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { itemId, quantity, idUser } = req.body;
      console.log(itemId, "....", quantity, "---", idUser);

      const cartUser = await Cart.find({ idUser: idUser })
        .populate("cartItems")
        .exec();
      const cartItems = cartUser[0].cartItems;
      const cartItemToUpdate = await cartItems
        .find((item) => item.idProductDetailSize === itemId)
        .populate({
          path: "idProduct",
          populate: {
            path: "idProductDetails",
          },
        });
      // console.log(cartItemToUpdate);

      if (cartItemToUpdate) {
        const sizeProduct =
          cartItemToUpdate.idProduct.idProductDetails.sizeProducts.find(
            (item) =>
              item._id.toString() ===
              cartItemToUpdate.idProductDetailSize.toString()
          );

        if (sizeProduct) {
          const size = sizeProduct.price * quantity * 1000;

          cartItemToUpdate.quantityCart = quantity;
          (cartItemToUpdate.price = size), await cartItemToUpdate.save();

          let totalCartPrice = 0;
          cartItems.forEach((item) => {
            totalCartPrice += item.price;
          });

          cartUser[0].priceCart = totalCartPrice;
          await cartUser[0].save();
          console.log(totalCartPrice);
        } else {
          console.log("Không tìm thấy size phù hợp.");
        }
      }

      return res.status(200).json({ message: "Cập nhật thành công" });
      // console.log(cartItemToUpdate);
    } catch (error) {
      console.log(error);
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { idItem } = req.body;

      // Tìm giỏ hàng chứa idItem
      const cart = await Cart.findOne({ cartItems: idItem });

      if (!cart) {
        return res.status(404).json({ error: "Không tìm thấy giỏ hàng" });
      }

      // Xóa idItem khỏi mảng cartItems
      cart.cartItems.pull(idItem);

      // Lưu giỏ hàng đã được cập nhật
      const updatedCart = await cart.save();

      // Xóa sản phẩm trong cartDetails
      const cartDetails = await CartDetail.findOne({ _id: idItem });

      if (cartDetails && cart) {
        const updatedPrice = cart.priceCart - cartDetails.price;
        console.log(updatedPrice);
        cart.priceCart = updatedPrice;
        await cart.save();
      }

      await CartDetail.deleteOne({ _id: idItem });
      // Cập nhật lại giá trị giỏ hàng

      return res.status(200).json({ error: "Xóa sản phẩm thành công" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Lỗi khi xóa sản phẩm khỏi giỏ hàng" });
    }
  },

  deleteAllCart: async (req, res) => { 
    try {
      const {idCart} = req.body

      await CartDetail.deleteMany({ idCart: idCart });
      await Cart.deleteOne({ _id: idCart });
    } catch (error) {
      console.log(error);
    }
  }
  // Gọi hàm deleteCartItem
};

module.exports = CardController;
