import Header from "./Header";
import Sidebar from "./Sidebar";
import "../DefaultLayout/defaultLayout.css";
import {  useState } from "react";
import { useSelector } from "react-redux";


function DefaultLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productHome = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${isMenuOpen ? "menu-open" : ""}`}>
      <div className="flex-layout">
        <div className="layout">
          {" "}
          <Header product={productHome} />
        </div>

        <div className="side-layout">
          {" "}
          <Sidebar isMenuOpen={isMenuOpen}  toggleMenu={toggleMenu} />
        </div>
      </div>
      <div className="container content-page">
        <div  className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
