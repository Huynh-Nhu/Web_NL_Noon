import { Link } from "react-router-dom";
import InforCustomer from "../../../InforCutomer";
import "../Header/header.css";
import InconCart from "../../../inconCart";
import { useSelector } from "react-redux";
import SearchProduct from "../../../SearchProduct";

function Header(props) {
  const { product } = props;
  const cart = useSelector((state) => state.card?.cardProduct?.cardData);
  const products = product?.map((pdt) => {
    const filteredProduct = {
      _id: pdt._id,
      nameProduct: pdt.nameProduct,
      sizeProducts: pdt.idProductDetails?.sizeProducts?.map((item) => ({
        img: item.img,
        id: item._id
      })),
    };
  
    return filteredProduct;
      
  })
  return (
    <div className="container ">
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img src="/assets/logo/noon.png" />
          </div>
        </Link>
        <div className="search" >
          <SearchProduct data={products} />
        </div>
       <div className="d-flex">
          <Link to="/cart">
            <div className="cart mt-3">
              <InconCart cart={cart} />
            </div>
          </Link>
          <div className="customer-info">
            <InforCustomer />
          </div>
       </div>
      </div>
    </div>
  );
}

export default Header;
