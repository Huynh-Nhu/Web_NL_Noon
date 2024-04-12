import Modal from "react-bootstrap/Modal";
import "../DeliveryLayout/delivery.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { Card, CardHeader, DropdownItem } from "react-bootstrap";

function DeliveryLayout(props) {
  const { order, handleDeliverySusses } = props;
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setShow(true);
    setSelectedOrder(order);
  };
  const calculateTotalPrice = (orderDetail) => {
    let totalPrice = 0;
    orderDetail.forEach((detail) => {
      totalPrice +=
        detail.idProduct.priceOrder * detail.idProduct.quantityOrder;
    });
    return totalPrice;
  };
  const handleDelivery = (idOrder) => {
    handleDeliverySusses(idOrder);
    setDeliveredOrders([...deliveredOrders, idOrder]);
  };
  const isDelivered = (orderId) => {
    return deliveredOrders.includes(orderId);
  };

  return (
    <div>
      <div className=" row ">
        {order?.map((item, index) => (
          <div
            className=" align-items-center delivery-shipper d-flex col-5  m-4 p-0 flex-wrap justify-content-between"
            key={item._id}
          >
            <p onClick={() => handleShow(item)} className="index-order">
              {order.length - index}
            </p>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fa-solid fa-address-card"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <DropdownItem>
                  Tên khách hàng: {item.idUser.nameCustomer}
                </DropdownItem>
                <DropdownItem>
                  Số điện thoại: {item.idUser.phoneCustomer}
                </DropdownItem>
                <DropdownItem>
                  Đia chỉ: {item.idUser.idAddress.nameAddress}
                </DropdownItem>
              </Dropdown.Menu>
            </Dropdown>

            <p>{calculateTotalPrice(item.orderDetail).toLocaleString()}</p>
            <p style={{ color: "red" }}>
              {item.payMethod === "online" ? "Đã thanh toán" : "COD"}
            </p>
            {!isDelivered(item._id) && item.status !== "Đã giao hàng" && (
              <p
                onClick={() => handleDelivery(item._id)}
                className="btn-delivery"
              >
                Giao
              </p>
            )}
          </div>
        ))}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder &&
            selectedOrder.orderDetail.map((detail, index) => (
              <Card className="mt-2" key={index}>
                <CardHeader className="bg-info-subtle ">
                  Tên sản phẩm: {detail.nameProduct}
                </CardHeader>

                <div className="row d-flex">
                  <div className="col-6 text-center">
                    {" "}
                    <img
                      style={{ width: "120px" }}
                      src={detail.idProduct.img}
                    />
                  </div>
                  <div className="col-6">
                    <p>Kích thước: {detail.idProduct.size}</p>
                    <p>Số lượng: {detail.idProduct.quantityOrder}</p>
                    <p>
                      Thành tiền: {detail.idProduct.priceOrder.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeliveryLayout;
