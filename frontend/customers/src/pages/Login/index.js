import { useState } from "react";
import { loginCustomers } from "../../service/apiCustomer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginWithGoogle from "../../components/LoginWithGoogle";
import LoginLayout from "../../components/loginLayout";

import "../Login/loginPage.css";

function LoginPage() {
  const [nameCustomer, setNameCustomer] = useState("");
  const [passwordCustomer, setPasswordCustomer] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmailOrPhone = (email) => {
    setNameCustomer(email);
  };
  const handlePassword = (password) => {
    setPasswordCustomer(password);
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      emailOrPhone: nameCustomer,
      password: passwordCustomer,
    };
    loginCustomers(newCustomer, dispatch, navigate)
      .then((data) => {
        toast.error(data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      
  };

  return (
    <div className="login-page row ">
      <div className="login-form-container col-md-6 offset-md-3 align-self-center ">
        <div className="row content-form-login ">
          <h2 className="mt-5">Đăng Nhập</h2>
          <div className="col-6 align-self-center">
            {" "}
            <img className="img-login" src="/assets/login.svg" />
          </div>
          <div className="col-6 form-login align-self-center">
            {/* <h2 className="name-login-form" >Đăng Nhập</h2> */}
            <LoginLayout
              nameCustomer={nameCustomer}
              passwordCustomer={passwordCustomer}
              handleEmailOrPhone={handleEmailOrPhone}
              handlePassword={handlePassword}
              handlSubmit={handlSubmit}
            />
            <LoginWithGoogle />
            <p>
              Nếu chưa có tài khoản hãy nhấn vào <Link to="/register">Đây</Link>
            </p>
          </div>
        </div>
      </div>

      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginPage;
