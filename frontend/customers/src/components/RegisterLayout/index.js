import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RegisterLayout(props) {
  const {
    nameCustomer,
    passwordCustomer,
    phoneCustomer,
    emailCustomer,
    nameAddress,
    handleNameCustomer,
    handlePasswordCustomer,
    handlePhoneCustomer,
    handleEmailCustomer,
    handleAddressCustomer,
    handleSubmit,
  } = props;

  const handleNameCustomerChange = (e) => {
    const name = e.target.value;
    handleNameCustomer(name);
  };

  const handlePasswordCustomerChange = (e) => {
    const password = e.target.value;
    handlePasswordCustomer(password);
  };

  const handleEmailCustomerChange = (e) => {
    const email = e.target.value;
    handleEmailCustomer(email);
  };

  const handleAddressCustomerChange = (e) => {
    const address = e.target.value;
    handleAddressCustomer(address);
  };

  const handlePhoneCustomerChange = (e) => {
    const phone = e.target.value;
    handlePhoneCustomer(phone);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="nameRegister">
        <Form.Control
          sm={8}
          value={nameCustomer}
          placeholder=" Nhập tên tài khỏan"
          onChange={handleNameCustomerChange}
          type="text"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneRegister">
        <Form.Control
          value={phoneCustomer}
          onChange={handlePhoneCustomerChange}
          type="text"
          placeholder="Nhập số điện thoại "
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="emailRegister">
        <Form.Control
          value={emailCustomer}
          onChange={handleEmailCustomerChange}
          type="email"
          placeholder="Nhập email "
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="addressRegister">
        <Form.Control
          value={nameAddress}
          onChange={handleAddressCustomerChange}
          type="text"
          placeholder="Nhập địa chỉ"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordRegister">
        <Form.Control
          value={passwordCustomer}
          onChange={handlePasswordCustomerChange}
          type="password"
          placeholder="Nhập mật khẩu cho tài khoản"
        />
      </Form.Group>

      <Button variant="dark" type="submit">
        Đăng ký
      </Button>
    </Form>
  );
}

export default RegisterLayout;
