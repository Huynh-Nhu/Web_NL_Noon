import { useState } from "react";
import SetPasswordFrom from "../../components/setPassword";
import { setPass } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../Redux/createdInstance";
import { setPassSuccess } from "../../Redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { refreshTokenSuccess } from "../../Redux/authSlice";

function SetPassword() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailPass, setEmailStaff] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleEmailChangePass = (emailStaff) => {
    setEmailStaff(emailStaff);
  };
  const handlePasswordOldChange = (passwordOld) => {
    setPasswordOld(passwordOld);
  };
  const handlePasswordNewChange = (passwordNew) => {
    setPasswordNew(passwordNew);
  };
  let axiosJWT = createAxios(user, dispatch, refreshTokenSuccess);

  if (!user) {
    navigate("/login");
  }
  const handleSetPass =async (e) => {
    e.preventDefault();
    const newSetPass = {
      email: emailPass,
      password: passwordOld,
      passwordNew: passwordNew,
    };
    const result = await setPass(newSetPass, dispatch, axiosJWT, user?.accessToken);
    console.log(result);
    if (result.status === 200) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <div className="row align-items-center mt-5">
      <div className="col-8">
         <SetPasswordFrom
           handleEmailChange={handleEmailChangePass}
           handlePasswordNewChange={handlePasswordNewChange}
           handlePasswordOldChange={handlePasswordOldChange}
           handleSetPass={handleSetPass}
           emailStaff={emailPass}
           passwordOld={passwordOld}
           passwordNew={passwordNew}
           showModal={showModal}
           modalMessage={modalMessage}
           handleCloseModal={handleCloseModal}
         />
      </div>
      <div className="col-4 mt-5">
         <img style={{width: "300px"}} src="assets/img/background/mobile-password-forgot.png" />
         </div >
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SetPassword;
