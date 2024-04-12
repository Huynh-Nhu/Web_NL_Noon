import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Address(props) {
  const { handleAddressSave, address } = props;
  const [showModal, setShowModal] = useState(!address);
  
  const [editingAddress, setEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(address);

  const handleAddressUpdate = () => {
    setShowModal(true);
    setEditingAddress(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingAddress(false);
  };

  const handleAddressSaveChange = () => {
    // Kiểm tra địa chỉ có đủ độ dài hay không (ít nhất 2 ký tự)
    if (newAddress.length >= 2) {
      // Thực hiện logic lưu địa chỉ mới vào database hoặc trạng thái của component
      handleAddressSave(newAddress);
      setShowModal(false);
      setEditingAddress(false);
    } else {
      alert("Địa chỉ phải có ít nhất 2 ký tự.");
    }
  };

  return (
    <div className="mt-3">
      {address && !editingAddress ? (
        <p>
          Địa chỉ: {address}{" "}
          <i className="fa-solid fa-user-pen" onClick={handleAddressUpdate}></i>
        </p>
      ) : (
        <p className="">
          Địa chỉ:{" "}
          <i className="fa-solid fa-user-pen" onClick={handleAddressUpdate}></i>
        </p>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form cập nhật địa chỉ */}
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddressSaveChange}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Address; 