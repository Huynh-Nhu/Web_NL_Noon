import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  Button,
  CardFooter,
} from "react-bootstrap";
import OrderStatus from "../StepOrder";

function OrderListLayout(props) {
  const { listOrder, handleCancelOrder } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowModal = (orders) => {
    const listProduct = orders.map((product) => {
      return product;
    });
    setSelectedOrder(listProduct);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {listOrder?.map((item, index) => (
        <div className="col">
          <Card key={index}>
            <CardHeader
              className="bg-info bg-gradient p-2 text-dark bg-opacity-50"
              style={{ textAlign: "left" }}
            >
              <p>Địa chỉ: {item?.idUser?.idAddress?.nameAddress}</p>
              <p> Số điện thoại: {item?.idUser?.phoneCustomer}</p>
            </CardHeader>
            <CardBody>
              <div key={index}>
                <OrderStatus status={item.status} />
                <div >
                  <p className="mt-2">
                    Tổng giá tiền:{" "} 
                    <span style={{ color: "red" }}>{item.totalOrder.toLocaleString()} đ</span>
                  </p>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Button variant="dark" onClick={() => handleShowModal(item?.orderDetail)}>
                      Xem chi tiết
                    </Button>
                  </div>
                  <div className="col-6">
                    {item?.status === "Đang chờ xử lý" ? (
                      <Button variant="danger" onClick={() => handleCancelOrder(item._id)}>
                        Hủy đơn
                      </Button>
                    ) : (
                      <div>{item.status}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter style={{ textAlign: "left" }}>
              <p>
                Ngày đặt hàng:{" "}
                {item?.dayOrder ? new Date(item.dayOrder).toLocaleString() : ""}
              </p>
              <p>
                Ngày xác nhận đơn:{" "}
                {item?.dayCurrent
                  ? new Date(item.dayCurrent).toLocaleString()
                  : ""}
              </p>
              <p>
                Ngày giao hàng:{" "}
                {item?.dayShip
                  ? new Date(item.dayShip).toLocaleString().toUpperCase()
                  : ""}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder?.map((item) => (
            <Card>
              <CardHeader>{item.nameProduct}</CardHeader>
              <CardBody className="row">
                <div className="col-6">
                  <img src={item?.idProduct?.img} />
                </div>

                <div className="col-6 align-self: center">
                  <p>Giá của sản phẩm: {item.idProduct.price}</p>
                  <p>Số lượng đã đặt: {item.idProduct.quantityOrder}</p>
                  <p>
                    Thành tiền : {item.idProduct.priceOrder.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default OrderListLayout;
