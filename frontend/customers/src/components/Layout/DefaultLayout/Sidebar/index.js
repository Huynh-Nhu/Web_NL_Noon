import React, { useEffect, useState } from "react";
import "../Sidebar/side.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../../service/apiCustomer";
import { Link, useLocation } from "react-router-dom";
import { menuSuccess } from "../../../../Redux/cardSlice";
function Sidebar(props) {
  const { isMenuOpen, toggleMenu } = props;
  // const [hoveredItem, setHoveredItem] = useState([]);
  
  const category = useSelector(
    (state) => state.category?.allCategory?.categoryData
  );
  const dispatch = useDispatch();
 
  // const handleItemHover = (cate) => {
  //   setHoveredItem(cate.categoryDetails);
  // };
  const handleLinkClick = () => {
    // dispatch(menuSuccess(isMenuOpen))
    toggleMenu(); // Đóng menu khi nhấn vào liên kết
  };

  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);
  return (
    <div className="sidebar container">
      <div className="menu-content">
        <button className="menu-button " onClick={toggleMenu}>
          <i className=" fa-solid fa-bars"></i> Menu
        </button>
      </div>
      {isMenuOpen  && (
        <ul className="cate-list ">
          {category.map((cate, index) => (
            <li
              // onMouseEnter={() => handleItemHover(cate)}
              // onMouseLeave={() => setHoveredItem([])}
              className="d-flex align-items-center"
              key={index}
            >
            <Link to={{
              pathname: "/product",
              search: `?id=${cate._id}&category=${cate.nameCategory}`
            }}
            onClick={handleLinkClick}
            >
                <h5 className="cate-name">{cate.nameCategory}</h5>
  
            </Link>
              <div className="ms-auto p-2">
                <img
                  className="img-cate"
                  src={cate.imgCategory}
                  alt={cate.nameCategory}
                />
              </div>
              {/* <div className="">
                {hoveredItem?.length > 0 &&
                  hoveredItem[0].img === cate.categoryDetails[0].img && (
                    <div className="category-details">
                      {hoveredItem.map((detail, index) => (
                        <div  key={index}>
                          <li className="d-flex  align-items-center">
                            <p className="cate-name">
                              {detail.name}
                            </p>
                            <div className="ms-auto p-2"><img className="img-cate" src={detail.img} /></div>
                          </li>
                        </div>
                      ))}
                    </div>
                  )}
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Sidebar;
