import React, { useEffect, useState } from "react";
import "../ProductDetailLayout/detail.css";
import { useSelector } from "react-redux";

function ProductDetailLayout(props) {
  const { detail, idDetail, addCart } = props;
  const [currentSize, setCurrentSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [priceNew, setPriceNew] = useState();
  const handleClickSize = (size) => {
    const selectedProduct = detail?.idProductDetails?.sizeProducts.find(
      (product) => product._id === size._id
    );
    setPrice(selectedProduct.price);
    setSelectedSize(selectedProduct);
  };
  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithSize = {
        ...selectedSize,
        productName: detail.nameProduct,
        quantity: quantity,
        price: priceNew,
        id_product: detail._id,
        id_user: props.customer?.customer?._id,
      };
      addCart(productWithSize);
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0 && newQuantity <= selectedSize.quantity) {
      setQuantity(newQuantity);
    }
  };
  useEffect(() => {
    const newPrice = price * quantity * 1000;
    setPriceNew(parseFloat(newPrice).toLocaleString());
  }, [quantity, selectedSize]);

  useEffect(() => {
    if (selectedSize) {
      setQuantity(1);
    }
  }, [selectedSize]);

  useEffect(() => {
    const current = detail?.idProductDetails?.sizeProducts?.find(
      (size) => size._id === idDetail
    );
    setPrice(current?.price);
    setSelectedSize(current);
    setCurrentSize(current);
  }, [detail, idDetail]);
  if (!detail) {
    return <p>Loading...</p>;
  }

  if (!currentSize) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="product-detail-layout">
        <div className="image-section">
          <img
            className="product-image"
            src={selectedSize ? selectedSize.img : currentSize.img}
            alt={selectedSize ? selectedSize.size : currentSize.size}
          />
        </div>
        <div className="price-section">
          <h5>
            {detail.nameProduct}:{" "}
            <span>{selectedSize ? selectedSize?.size : currentSize?.size}</span>
          </h5>
          <p className="left-p">Chọn size cho sản phẩm: </p>
          {detail.idProductDetails.sizeProducts.map((product) => (
          
              <button
                key={product._id}
                className={` mx-1 ${
                  selectedSize && selectedSize._id === product._id ? "active" : ""
                } , btn-size`}
                onClick={() => handleClickSize(product)}
              >
                {product.size}
              </button>
          
          ))}
          <p className="left-p" >Kho có: {selectedSize.quantity}</p>

         <div className="row">
           <div className="col-6">
              {selectedSize && (
                <div className="quantity-section">
                  <label htmlFor="quantity">Chọn số lượng : </label>
                  <input
                   className="quantity-input"
                    type="number"
                    id="quantity"
                    value={quantity}
                    min={1}
                    max={selectedSize.quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              )}
           </div>
  
           <div className="col-6 price-product"> <p>Thành tiền: <span style={{color : "#cb0e0e"}}>{priceNew}</span></p></div>
         </div>
          {selectedSize.quantity > 0 && selectedSize.state === true ? (
            <button className="add-to-cart" onClick={() => handleAddToCart()}>Add to Cart</button>
          ) : (
            <button  className="add-to-disable" disabled>Add to Cart</button>
          )}
        </div>
      </div>
      <div className="position-relative mt-4 description-product">
        <div className="position-absolute top-0 start-50 translate-middle ">
          <h3>Thông Tin Sản Phẩm</h3>
        </div>
        <p className="p-4">{detail.idProductDetails.descriptionProducts}</p>
      </div>
    </div>
  );
}

export default ProductDetailLayout;
