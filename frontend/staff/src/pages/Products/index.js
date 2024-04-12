import { useEffect, useState } from "react";
import { Card, CardImg, CardText, CardTitle } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../Products/products.css";

function ProductPage() {
  const categoryDetails = useSelector(
    (state) => state.category?.getAllCategory.allCate
  );
  const location = useLocation();
  const [id, setId] = useState("");
  const [oneDetail, setOneDetail] = useState("");
  useEffect(() => {
    const path = location.pathname;
    const id = path.split("/")[1];
    setId(id);
    const categoryOne = categoryDetails.find((item) => item._id === id);
    setOneDetail(categoryOne);
  }, [location, categoryDetails]);

  const [currentPage, setCurrentPage] = useState(0);
  const cardPerPage = 6;
  const totalPages =
    Math.ceil(oneDetail?.categoryDetails?.length / cardPerPage) || 0;
  useEffect(() => {
    setCurrentPage(0);
  }, [oneDetail]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastCard = (currentPage + 1) * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCards = oneDetail?.categoryDetails?.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  return (
    <div>
      <div
        className="row row-cols-1 row-cols-md-3 g-4 m-0"
        style={{ height: "85vh" }}
      >
        {currentCards?.map((detail, idx) => (
          <div className="col" key={idx}>
            <Card className="custom-card-detail" >
              <div className="add-icon-container">
                <Link
                  to={{
                    pathname: "/productAdd",
                    search: `?id=${id}&detailName=${encodeURIComponent(
                      detail.name
                    )}`,
                  }}
                >
                  <i className="fa-solid fa-circle-plus add-products"></i>
                </Link>
              </div>
              <Link
                to={{
                  pathname: "/productList",
                  search: `?id=${id}&detailName=${encodeURIComponent(
                    detail.name
                  )}`,
                }}
              >
                <CardImg
                  className="custom-image-detail"
                  src={detail.img}
                ></CardImg>
                <Card.ImgOverlay className="card-orverlay-product">
                  <CardText >{detail.name}</CardText>
                </Card.ImgOverlay>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPages}
          breakClassName={"break-me"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          // subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          // initialPage={initialPage}
        />
      </div>
    </div>
  );
}

export default ProductPage;
