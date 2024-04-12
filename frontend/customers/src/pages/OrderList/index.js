import { useDispatch, useSelector } from "react-redux";
import OrderListLayout from "../../components/OrderListLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { cancelOrder, orderCustomer } from "../../service/apiCustomer";

function OrderList() {
  const dispatch = useDispatch();
  const idUser = useSelector(
    (state) => state.loginCustom.login.currentCustomer.customer._id
  );
  const order = useSelector((state) => state.order.allOrder.OrderData);
  const [listOrder, serListOrder] = useState(order);
  
  const handleCancelOrder = (idOrder) => {
    cancelOrder(idOrder).then((data) => {
      orderCustomer(idUser, dispatch);

      toast.success(data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    });
  };
  useEffect(() => {
    orderCustomer(idUser, dispatch);
   
  }, [dispatch, idUser ]);
  return (
    <div>
      <OrderListLayout
        listOrder={listOrder}
        handleCancelOrder={handleCancelOrder}
      />
        <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default OrderList;
