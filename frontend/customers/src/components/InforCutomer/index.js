import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import "../InforCutomer/inforCustomer.css"; // Đường dẫn đến file CSS
import { logout } from "../../service/apiCustomer";
import { Link, useNavigate } from "react-router-dom";

function InforCustomer() {
  const customer = useSelector(
    (state) => state.loginCustom?.login?.currentCustomer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch, navigate);
  };
  const renderCustomerInfo = () => {
    if (customer === null) {
      return (
        <>
          <Link to="/login">
            {" "}
            <button className="btn-auth">Login</button>
          </Link>
          <Link to="/register">
            {" "}
            <button className="btn-auth">Register</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <div className="customer-info-container">
            <img
              src={customer?.customer?.avatarCustomer}
              alt="Avatar"
              className="customer-avatar"
            />
            <p className="customer-name">{customer?.customer?.nameCustomer}</p>
            <button
              className=" btn-setting"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>

          <div
            className="offcanvas   offcanvas-end"
            style={{ width: "300px" }}
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            data-bs-backdrop="false"
          >
            <div className="offcanvas-header ">
              <h3 className="offcanvas-title" id="offcanvasRightLabel">
                Cài Đặt
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="p-0">
                <Link to="/order">
                  <div className="d-flex mb-3">
                    <img
                      style={{ width: "30px" }}
                      src="assets/order-icon/order.png"
                    />
                    <li>Đơn hàng</li>
                  </div>
                </Link>
                {customer.iss !== "https://accounts.google.com" && (
                  <Link to="/setPass">
                    {" "}
                   <div className="d-flex">
                      <img
                        style={{ width: "30px" }}
                        src="assets/order-icon/shield.png"
                      />
                      <li>Đặt lại mật khẩu</li>
                   </div>
                  </Link>
                )}
               
              </ul>

              <button onClick={handleLogout} className=" logout-button">
                
                Logout <span className="mx-1" ><i className="fa-solid fa-right-from-bracket"></i></span>
              </button>
            </div>
          </div>
        </>
      );
    }
  };

  return <div className="customer-info-container">{renderCustomerInfo()}</div>;
}

export default InforCustomer;
