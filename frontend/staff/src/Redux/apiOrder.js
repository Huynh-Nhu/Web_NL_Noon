import axios from "axios";
import {getOrderSuccess} from "../Redux/orderSlice"

export const getAllOrder = async (dispatch) => {
    try {
        const res= await axios.get("http://localhost:8080/order/getOrderAdmin")
        dispatch(getOrderSuccess(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const confirmOrder = async (idOrder , idStaff) => {
    try {
        const res= await axios.post("http://localhost:8080/order/confirmOrder", {
            idOrder: idOrder, idStaff: idStaff
        })
        return res.data.message
    } catch (error) {
        console.log(error);
    }
}


