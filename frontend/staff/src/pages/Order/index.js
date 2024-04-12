import { useEffect, useState } from "react";
import Orderlayout from "../../components/Orderlayout";
import { getAllOrder } from "../../Redux/apiOrder";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../../Redux/apiOrder";

function OrderPage() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.getAllOrder.allOrder);
  const idStaff = useSelector((state) => state.auth?.login?.currentUser?._id);
  const [loading, setLoading] = useState(false);
  const handleConfirm = (idOrder) => {
    setLoading(true);
    confirmOrder(idOrder, idStaff).then(async () => {
      await getAllOrder(dispatch);
      setLoading(false);
    });
  };
  setInterval(() => {
    getAllOrder(dispatch);
  }, 5000);
  useEffect(() => {
    getAllOrder(dispatch);
  }, [dispatch]);
  return (
    <div>
      <Orderlayout
        setLoading={setLoading}
        loading={loading}
        handleConfirm={handleConfirm}
        order={order}
      />
    </div>
  );
}

export default OrderPage;
