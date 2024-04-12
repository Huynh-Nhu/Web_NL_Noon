import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import imgLogin from "/public/assets/login.svg"
function LoginLayout(props) {
  const handleChangeEmailPhone = (e) => {
    const email = e.target.value;
    props.handleEmailOrPhone(email);
  };
  const handleChangePassword = (e) => {
    const password = e.target.value;
    props.handlePassword(password);
  };
  return (
    <div className="login-form" >
      
      <Form onSubmit={props.handlSubmit}>
        <Form.Group as={Row} className="" controlId="emailCustomer">
         
          <Col sm={12}>
            <Form.Control
              value={props.nameCustomer}
              type="text"
              placeholder=" Email or SĐT"
              onChange={handleChangeEmailPhone}

            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} className="mt-3" controlId="passwordCustomer">
         
          <Col sm={12}>
            <Form.Control
              value={props.passwordCustomer}
              type="password"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} className="mt-3">
          <Col sm={{ span: 8, offset: 2 }}>
            <Button className="btn-dark" type="submit">Đăng Nhập</Button>
          </Col>
        </Form.Group>

        
      </Form>
    </div>
  );
}

export default LoginLayout;
