import { useEffect } from "react";

function InconCart(props) {
  const { cart } = props;
  // const length = cart[0].cartItems.length;
  // console.log(cart[0].cartItems.length);
  useEffect(() => {
    
  }, [])
  return (
    <div>
      {/* <i
        style={{ color: "white", fontSize: "18px" }}
        className="fa-solid fa-cart-shopping"
      ></i> */}

      <i style={{ color: "white", fontSize: "18px" }} class="fa-solid fa-cart-shopping position-relative">
        
        {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-secondary" style={{fontSize: "10px"} }>
           <span> {length}</span>
        </span> */}
      </i>
    </div>
  );
}

export default InconCart;
