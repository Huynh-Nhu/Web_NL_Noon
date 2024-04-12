import { Link } from "react-router-dom";
import "../../components/Login/login.css";
function LoginForm(props) {
  const handleEmailChange = (event) => {
    const email = event.target.value;
    props.setStaffEmail(email);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    props.setStaffPassword(password);
  };

  return (
    <div className="login-component">
          <div className="login-form">
            <form onSubmit={props.handleLogin}>
              <div className="row mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    value={props.staffEmail}
                    onChange={handleEmailChange}
                    type="email"
                    className="form-control"
                    id="email"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="password" className="col-sm-2 col-form-label">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    value={props.staffPassword}
                    onChange={handlePasswordChange}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn  btn-login">
                  Sign in
                </button>
              </div>
            </form>

            <div className="login-link-register">
                <p>
                  Nếu bạn chưa có tài khoản vui lòng nhấn vào 
                  <span>
                    <Link className="link-register" to="/register">
                      Register
                    </Link>
                  </span>
                  nhé 
                </p>
            </div>
          </div>
        
     
    </div>
  );
}

export default LoginForm;
