import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./DefaultLayout.css";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div className="container-fluid">
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  );
}

export default DefaultLayout;