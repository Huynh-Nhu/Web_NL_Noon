import axios from "axios";
import { loginSuccess, logoutSuccess } from "../Redux/authSlice";
import { categorySuccess } from "../Redux/categorySlice";
import { getProductSuccess } from "../Redux/productSlice";
import { brandSuccess } from "../Redux/brandSlice";
import { getDetailSuccess } from "../Redux/detailSlice";
import {
  cardSuccess,
  deleteCartSuccess,
  updateCartSuccess,
} from "../Redux/cardSlice";
import { getOrderSuccess } from "../Redux/orderSlice";

export const handleCallbackResponse = async (response, dispatch, navigate) => {
  try {
    const id_token = response.credential;
    const res = await axios.post("http://localhost:8080/customer/google", {
      token: id_token,
    });
    dispatch(loginSuccess(res.data));
    navigate("/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginCustomers = async (newCustomer, dispatch, navigate) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/customer/login",
      newCustomer
    );
    dispatch(loginSuccess(res.data));
   
    navigate("/");
    return res.data.message;
  } catch (error) {
    return error.response.data.message
  }
};

export const registerCustomer = async (newCustomer) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/customer/register",
      newCustomer
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (dispatch, navigate, cart) => {
  try {
    dispatch(logoutSuccess());
    dispatch(deleteCartSuccess(cart));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8080/category/getAllCategory"
    );

    dispatch(categorySuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/products/product");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllBrand = async (isID, dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/brand/brandOne", {
      params: { isID },
    });
    dispatch(brandSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetail = async (id, idProductDetail, dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8080/products/getProductDetail",
      {
        params: { id: id, productDetail: idProductDetail },
      }
    );
    dispatch(getDetailSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addProductCart = async (cart) => {
  try {
    const res = await axios.post("http://localhost:8080/cart/add", {
      carts: cart,
    });
    return res.data.message
  } catch (error) {
    console.log(error);
  }
};

export const getProductCart = async (id, dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/cart/getCart", {
      params: { idUser: id },
    });
    return res.data;
    // dispatch(cardSuccess(res.data))
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (itemId, newQuantity, idUser, dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/cart/quantity", {
      itemId: itemId,
      quantity: newQuantity,
      idUser: idUser,
    });
    dispatch(updateCartSuccess(res.data.message));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (itemId) => {
  try {
    const res = await axios.post("http://localhost:8080/cart/delete", {
      idItem: itemId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addPay = async (idUser, address, phone, paymentOption, totalPrice) => {
  try {
    const res = await axios.post("http://localhost:8080/pay/address", {
      idUser: idUser,
      address: address,
      phone: phone,
      paymentOption: paymentOption,
      totalPrice: totalPrice
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartAll = async (id) => {
  try {
    const res = await axios.post("http://localhost:8080/cart/deleteAll", {
      idCart: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderCustomer = async (id, dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/order/getOrderCustomer", {
      idCustomer: id,
    })
    dispatch(getOrderSuccess(res.data))
  } catch (error) {
    console.log(error);
  }
}
export const cancelOrder = async (id) => {
  try {
    const res = await axios.post("http://localhost:8080/order/cancelOrder", {
      idOrder: id,
    })
    return res.data.message;  
  } catch (error) {
    console.log(error);
  }
}

export const SetPasswordCustomer = async (value) => {
  try {
    const res = await axios.post("http://localhost:8080/customer/setPass", value)
    return res.data
  } catch (error) {
    console.log(error);
  }
}