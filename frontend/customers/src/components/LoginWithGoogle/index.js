import { useEffect } from "react";
import { handleCallbackResponse } from "../../service/apiCustomer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginWithGoogle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    window.google?.accounts.id.initialize({
      client_id: "57483423174-rvsv6jp7ou5jbloa7ldu44f0hsrvgg2v.apps.googleusercontent.com",
      callback: (response) => {
        handleCallbackResponse(response,dispatch,navigate);
      },

    });
    window.google?.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, [])
  return (
   
     
        <div style={{margin: "25px"}} id="signInDiv"></div>
     
    
  );
}

export default LoginWithGoogle;
