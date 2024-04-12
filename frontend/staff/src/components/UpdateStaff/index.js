import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Form, Modal, ModalHeader } from "react-bootstrap";
import { updateStaff } from "../../Redux/apiRequest";

function UpdateStaff(props) {
  const { show, handleCloseModal, selectedStaffId , accessToken, axiosJWT} = props;
  
  console.log(selectedStaffId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useState("");
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  
  const handleAuthChange = (e) => {
    setAuth(e.target.value);
  };
  const handleUpdateClick = () => {
    const updated = {
      id: selectedStaffId._id,
      idStaff: {
        nameStaff: name,
        phoneStaff: phone,
        emailStaff: email,
        addressStaff: address,
      },
      nameAuth: auth,
    };
    updateStaff(updated,accessToken,axiosJWT )
  };
  

  useEffect(() => {
    if (selectedStaffId) {
      setName(selectedStaffId.idStaff.nameStaff);
      setPhone(selectedStaffId.idStaff.phoneStaff);
      setEmail(selectedStaffId.idStaff.emailStaff);
      setAddress(selectedStaffId.idStaff.addressStaff);
      setAuth(selectedStaffId.nameAuth);
    }
  }, [selectedStaffId]);

  return (
    <Modal show={show} onHide={handleCloseModal} >
      <ModalHeader closeButton></ModalHeader>
      <Form onSubmit={handleUpdateClick} style={{padding: "25px"}}>
        <Form.Group className="mb-3" controlId="updateNameStaff">
          <Form.Label>Tên</Form.Label>
          <Form.Control value={name}  onChange={handleNameChange} type="text" />
         
        </Form.Group>
        <Form.Group className="mb-3" controlId="updatePhoneStaff">
          <Form.Label>S Đ T</Form.Label>
          <Form.Control value={phone} onChange={handlePhoneChange} type="text" />
         
        </Form.Group>
        <Form.Group className="mb-3" controlId="updateEmailStaff">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={handleEmailChange} type="text" />
         
        </Form.Group>
        <Form.Group className="mb-3" controlId="updateAddressStaff">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control value={address} onChange={handleAddressChange} type="text" />
         
        </Form.Group>
        <Form.Group className="mb-3" controlId="updateAuthStaff">
          <Form.Label>Vai trò</Form.Label>
          <Form.Control value={auth}  onChange={handleAuthChange} type="text"  />
        </Form.Group>
      <div className="text-center">
          <Button variant="dark" type="submit" >
          Cập Nhật
        </Button>
      </div>
      </Form>
    </Modal>
  );
}

export default UpdateStaff;
