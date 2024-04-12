import { useEffect, useState } from "react";
import DeliveryLayout from "../../components/DeliveryLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { delivery, getOrderSendShipper } from "../../Redux/apiShipper";
function Delivery() {
  const dispatch = useDispatch();
  const shipper = useSelector((state) => state.auth.login?.currentUser);
  const order = useSelector(
    (state) => state.delivery?.orderShipper?.allOrderShipper
  );
  const [orderShipper, setOrderShipper] = useState([]);
  const handleDeliverySusses =  (idOrder) => {
    delivery(idOrder).then((data) => {
      toast.success(data.message, {
        position: "top-right",
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
    getOrderSendShipper(shipper._id, dispatch);
    setOrderShipper(order);
  setInterval(() => {
      getOrderSendShipper(shipper._id, dispatch);
    }, 5000);
  }, [dispatch]);
  return (
    <div>
      <DeliveryLayout
        order={orderShipper}
        handleDeliverySusses={handleDeliverySusses}
      />
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Delivery;
