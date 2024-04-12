import styles from "../../components/Register/register.css";
function RegisterForm(props) {
  const handleEmail = (e) => {
    const emailStaff = e.target.value;
    props.handleEmailChange(emailStaff);
  };
  const handlePhone = (e) => {
    const phoneStaff = e.target.value;
    props.handlePhoneChange(phoneStaff);
  }
  const handleName = (e) => {
    const nameStaff = e.target.value;
    props.handleNameChange(nameStaff);
  }
  const handleAddress = (e) => {
    const addressStaff = e.target.value;
    props.handleAddressChange(addressStaff);
  }
 
   return (
    <div className="register-component">
      <div className="register-form">
        <form onSubmit={props.handleRegister}  className="row g-3">
          <h3 className="text-register-info">
            Welcome to Noon
          </h3>
          <div className="col-md-6">
            <label htmlFor="emailStaff" className="form-label">
              Email
            </label>
            <input
              value={props.emailStaff}
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="emailStaff"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="nameStaff" className="form-label">
              Name
            </label>
            <input
              value={props.nameStaff}
              onChange={handleName}
              type="text"
              className="form-control"
              id="nameStaff"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phoneStaff" className="form-label">
              Phone
            </label>
            <input
              value={props.phoneStaff}
              onChange={handlePhone}
              type="text"
              className="form-control"
              id="phoneStaff"
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              value={props.addressStaff}
              onChange={handleAddress}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="btn btn-register">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
