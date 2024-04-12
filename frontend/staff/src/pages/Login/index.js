import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStaff } from "../../Redux/apiRequest";
import ModalForm from "../../components/Modal";
import styles from "../Login/loginPage.css";

function Login() {
  const user = useSelector((state) => state.auth.login);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle
  const handleStaffEmailChange = (email) => {
    setStaffEmail(email);
  };

  const handleStaffPasswordChange = (password) => {
    setStaffPassword(password);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const newStaff = {
      email: staffEmail,
      password: staffPassword,
    };
    loginStaff(newStaff, dispatch, navigate)
      .then((data) => {
        setMessage(data);
        setShow(true);
        setStaffEmail("");
        setStaffPassword("");
      })
      
  };

  return (
    <div className="row align-items-center login-page position-relative">
      <div className="position-absolute top-0 start-0">
        <img className="img-login" src="/assets/img/logo/1.png" />
      </div>

      <LoginForm
        staffEmail={staffEmail}
        staffPassword={staffPassword}
        setStaffEmail={handleStaffEmailChange}
        setStaffPassword={handleStaffPasswordChange}
        handleLogin={handleLogin}
        message={message}
      />
     
        <ModalForm message={message} show={show} handleClose={handleClose} />
    </div>
  );
}

export default Login;
