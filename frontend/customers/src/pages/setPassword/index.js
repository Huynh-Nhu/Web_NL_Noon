import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { SetPasswordCustomer } from "../../service/apiCustomer";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function SetPassword() {
  // const customer = useSelector(
  //   (state) => state.loginCustom?.login?.currentCustomer?.iss
  // );
  const [captcha, setCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onChange = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !oldPassword || !newPassword) {
      toast.error("Vui lòng nhập đầy đủ thông tin", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (captcha) {
      const newPasswordCustomer = {
        email: email,
        password: oldPassword,
        newPassword: newPassword,
      };
      SetPasswordCustomer(newPasswordCustomer).then((data) => {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      toast.error("Vui lòng xác thực người dùng", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="Pass-page">
      <div className="form-set-pass mt-5 row ">
        <div className="col-4">
          {" "}
          <h1>Cập Nhật Lại Mật Khẩu</h1>
          <img className="w-75" src="assets/thank/password.gif" />
        </div>
        <div className=" col-8  align-self-center">
          <Form onSubmit={handleSubmit} className="text-start p-5 " style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.326)", borderRadius: "25px"}}>
            <Form.Group as={Row} className="mb-3 align-items-center" controlId="EmailSetPass">
              <Form.Label column sm={2}>
                Email address
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter email"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 align-items-center" controlId="passwordOld">
              <Form.Label column sm={2}>
                Nhập mật khẩu cũ
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3 align-items-center" controlId="passwordNew">
              <Form.Label column sm={2}>
                Nhâp mật khẩu mới
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </Form.Group>
            <ReCAPTCHA
              sitekey="6LfFJqspAAAAABDV2gj2C525cMKK6J4Ke_ic2SjE"
              onChange={onChange}
            /> 

          <div className="text-center mt-3">
              <button  style={{border: "none", padding: "10px 100px", borderRadius: "100px", backgroundColor: "#bad8f7"}} type="submit">
                Submit
              </button>
          </div>
          </Form>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SetPassword;
