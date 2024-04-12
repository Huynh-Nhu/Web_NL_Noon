import axios from "axios";
import { orderShipperSuccess } from "./orderShipper";

export const sendShipper = async (idShipper, idOrder) => {
  try {
    const res = await axios.post("http://localhost:8080/order/sendShipper", {
      idShipper: idShipper,
      idOrder: idOrder,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getOrderSendShipper = async (idShipper, dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/shipper/getOrder", {
      idShipper: idShipper,
    });
    dispatch(orderShipperSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const delivery = async (idOrder) =>{
  try {
    const res = await axios.post("http://localhost:8080/shipper/delivery", {
      idOrder: idOrder
    })
    return res.data
  } catch (error) {
    console.log(error);
  }
}
