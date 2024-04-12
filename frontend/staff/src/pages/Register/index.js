import { useState } from "react";
import RegisterForm from "../../components/Register";
import { registerStaff } from "../../Redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/Register/registerPage.css"

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailStaff, setEmailStaff] = useState("");
  const [phoneStaff, setPhoneStaff] = useState("");
  const [nameStaff, setNameStaff] = useState("");
  const [addressStaff, setAddressStaff] = useState("");


  // handle
  const handleEmailChange = (emailStaff) => {
    setEmailStaff(emailStaff);
  };

  const handlePhoneChange = (phoneStaff) => {
    setPhoneStaff(phoneStaff);
  };

  const handleNameChange = (nameStaff) => {
    setNameStaff(nameStaff);
  };

  const handleAddressChange = (addressStaff) => {
    setAddressStaff(addressStaff);
  };

 

    const handleRegister = (e) => {
      e.preventDefault();
      const newStaff = {
        emailStaff: emailStaff,
        nameStaff: nameStaff,
        phoneStaff: phoneStaff,
        addressStaff: addressStaff,
      };
      registerStaff(newStaff, dispatch, navigate);
    };

  return (
    <div className="row align-items-center register-page position-relative">
      <div className="position-absolute top-0 start-0" >
        <img className="img-register" src="/assets/img/logo/1.png"/>
      </div>
      <RegisterForm
        emailStaff={emailStaff}
        phoneStaff={phoneStaff}
        nameStaff={nameStaff}
        addressStaff={addressStaff}
        handleEmailChange = {handleEmailChange}
        handlePhoneChange={handlePhoneChange}
        handleNameChange={handleNameChange}
        handleAddressChange={handleAddressChange}
        handleRegister={handleRegister}
      />
    </div>
  );
}

export default Register;
