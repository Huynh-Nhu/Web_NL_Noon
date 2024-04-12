import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PhoneSetting({ phone, handlePhoneSave }) {
  const [editingPhone, setEditingPhone] = useState(phone);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setEditingPhone(phone);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    setEditingPhone(event.target.value);
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  const handleSaveClick = () => {
    handlePhoneSave(editingPhone);
    setShowModal(false);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <span>
            Số Điện Thoại: {phone}{" "}
            <i onClick={handleEditClick} className="fa-solid fa-user-pen"></i>
          </span>
        </div>
      ) : (
        <div>
          <span>Số Điện Thoại:</span>
          <span>
            <input
              type="text"
              value={editingPhone}
              onChange={handleInputChange}
            />
          </span>
        </div>
      )}

      <Modal show={showModal} onHide={handleCancelClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Phone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editingPhone}
            onChange={handleInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PhoneSetting;