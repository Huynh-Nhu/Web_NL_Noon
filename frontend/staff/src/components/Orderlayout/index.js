import React, { useState } from "react";
import { Card, CardBody, CardHeader, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import { getAllOrder } from "../../Redux/apiOrder";
import { sendShipper } from "../../Redux/apiShipper";
import Shipper from "../Shipper";
import "../Orderlayout/orderLayout.css";
import { useDispatch } from "react-redux";

function Orderlayout(props) {
  const dispatch = useDispatch();
  const { order, handleConfirm, loading, setLoading } = props;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleConfirmChange = (idOrder) => {
    handleConfirm(idOrder);
  };

  const openModal = (index) => {
    setSelectedOrder(index);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleSelectOrder = (idOrder) => {
    const isSelected = selectedItems.includes(idOrder);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((orderId) => orderId !== idOrder));
    } else {
      setSelectedItems([...selectedItems, idOrder]);
    }
  };

  const handleSendShipper = (idShipper, idOrder) => {
    setLoading(true);
    sendShipper(idShipper, idOrder).then(() => {
      getAllOrder(dispatch);
      setSelectedItems([]);
      setShow(false);
      setLoading(false);
    });
  };
  return (
    <div>
      <div className="header-order">
        <div className="btn-shipper">
          {" "}
          {loading && (
            <Spinner
              className="spinner-order"
              variant="light"
              animation="grow"
            />
          )}
          <button onClick={handleShow}>
            <i className="fa-solid fa-truck"></i>
          </button>
        </div>
        <Shipper
          selectedItems={selectedItems}
          show={show}
          handleClose={handleClose}
          handleSendShipper={handleSendShipper}
        />
      </div>
      <div className="table-responsive text-center table-order">
        <table className="table  align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <th> check</th>
              </th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Ngày đặt hàng</th>
              <th scope="col">Ngày xác nhận đơn</th>
              <th scope="col">Nhân viên xác nhận</th>
              <th scope="col">Shipper</th>
              <th scope="col">Đơn hàng chi tiết</th>
              <th scope="col">Phương thức thanh toán</th>
              <th scope="col">Tổng giá tiền</th>
              <th scope="col">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {item.status === "Đã xác nhận đơn" ? (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelectOrder(item._id)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                <td>{item.idUser?.nameCustomer}</td>
                <td>{item.idUser?.phoneCustomer}</td>
                <td>{item.address?.nameAddress}</td>
                <td>{new Date(item?.dayOrder).toLocaleString()}</td>
                <td>
                  {" "}
                  {item?.dayCurrent === null ? (
                    <span>...</span>
                  ) : (
                    <span> {new Date(item?.dayCurrent).toLocaleString()}</span>
                  )}
                </td>
                <td>
                  {item?.idStaff === null ? (
                    <span>...</span>
                  ) : (
                    <span>{item.idStaff?.nameStaff}</span>
                  )}
                </td>
                <td>{item?.idShipper?.nameStaff}</td>
                <td className="">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => openModal(index)}
                  >
                    Xem
                  </button>
                </td>
                <td style={{ color: "red" }}> {item?.payMethod}</td>
                <td style={{ color: "blue" }}>{item?.totalOrder?.toLocaleString()}</td>
                <td>
                  {" "}
                  {item.status !== "Hủy đơn" ? (
                    <button
                      onClick={() => handleConfirmChange(item._id)}
                      className={`btn ${
                        item?.status === "Đang chờ xử lý"
                          ? "btn-dark"
                          : item?.status === "Đã xác nhận đơn"
                          ? "btn-danger"
                          : item?.status === "Đã giao hàng"
                          ? "btn-success"
                          : "btn-warning"
                      }`}
                    >
                      {item?.status}
                    </button>
                  ) : (
                    <div>
                      <p>{item?.status}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={selectedOrder !== null} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedOrder !== null &&
            order[selectedOrder]?.orderDetail?.map((product, index) => (
              <Card key={index} className="mb-3">
                <CardHeader>
                  {product?.nameProduct} -{" "}
                  <span>{product?.idProduct.size}</span>
                </CardHeader>
                <CardBody className=" ">
                  <div className="d-flex " style={{ alignItems: "center" }}>
                    <img
                      src={product?.idProduct?.img}
                      style={{ width: "100px" }}
                    />
                    <p className="mx-3">
                      Số lương:{" "}
                      <span style={{ color: "red" }}>
                        {product.idProduct.quantityOrder}
                      </span>
                    </p>

                    <p className="mx-3">
                      Thành tiền:
                      <span style={{ color: "blue" }}>
                        {" "}
                        {product.idProduct.priceOrder.toLocaleString()}
                      </span>
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

export default Orderlayout;
