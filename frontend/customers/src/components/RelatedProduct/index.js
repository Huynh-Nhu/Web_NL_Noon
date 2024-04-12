import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../RelatedProduct/related.css";
import { useEffect, useState } from "react";
function RelatedProduct(props) {
  //   console.log(props.related);
  const { related, id } = props;

  const [visibleCount, setVisibleCount] = useState(3);
  
  const handleShowMore = () => {
    setVisibleCount(visibleCount + 1);
  };
  const filteredProducts = related.filter((item) => item._id !== id);

  return (
    <div className="related-product position-relative">
       <div className="position-absolute top-0 end-0">
        {visibleCount < filteredProducts.length && (
          <button className="show-more-btn" onClick={handleShowMore}>
           Thêm
          </button>
        )}
     </div>
      <h2 style={{color: "#77c758"}}>Sản Phẩm Liên Quan</h2>
      <div className="d-flex  flex-wrap ">
        {filteredProducts.slice(0, visibleCount).map((item) => (
          <div className="d-flex  " key={item._id}>
            {item.idProductDetails.sizeProducts.map((sizeProduct) => (
              <div className="img-content-related " key={sizeProduct._id}>
                <p>
                  {item.nameProduct}: <span></span> {sizeProduct.size}
                </p>
                <div className="img-related">
                  <Link
                    to={{
                      pathname: "/productDetail",
                      search: `?id=${item._id}&idDetail=${sizeProduct._id}`,
                    }}
                  >
                    <img
                      className="img-detail-related"
                      src={sizeProduct.img}
                      alt={sizeProduct.size}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    
    </div>
  );
}

export default RelatedProduct;
