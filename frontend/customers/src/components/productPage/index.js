import Card from "react-bootstrap/Card";
import "../productPage/productPage.css";
import { Link } from "react-router-dom";
import { CardFooter } from "react-bootstrap";

function ProductPage(props) {

  return (
    <div className="card-container-product-page d-flex flex-wrap ">
      {props.products.map((product) =>
        product.idProductDetails.sizeProducts.map((item, i) => (
          <div className="m-2" key={i}>
           <Link to={{
             pathname: "/productDetail",
             search: `?id=${product._id}&idDetail=${item._id}`
           }}>
              <Card
                style={{ width: "13rem",  }}
                className="product-card-page  h-100"
              >
                <div className="text-center">
                  <Card.Img
                    variant="top"
                    src={item.img}
                    alt={product.nameProduct}
                    className="img-product-page"
                  />
                </div>
                <Card.Body>
                  <Card.Title>
                    {product.nameProduct} <span>: {item.size}</span>
                  </Card.Title>
                </Card.Body>
                  <CardFooter className="bg-info-subtle">
                    <p>Giá: {(parseFloat(item.price) * 1000).toLocaleString()}</p>
                  </CardFooter>
              </Card>
           </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductPage;
