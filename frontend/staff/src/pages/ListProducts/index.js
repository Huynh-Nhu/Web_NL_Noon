import { useEffect, useState } from "react";
import ListProductLayout from "../../components/ListProduct";
import {
  deleteDetailProduct,
  deleteProduct,
  getAllProducts,
  resertProduct,
  resetDetailProduct,
} from "../../Redux/apiProduct";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
function ListProductPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();
  const [refresh, setRefresh] = useState(false);
  const [idSize, setIdSize] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;
  const product = useSelector(
    (state) => state.products.getAllProducts?.allProduct
  );
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const detailName = searchParams.get("detailName");
    setDetail(detailName);
    getAllProducts(id, dispatch);
  }, [dispatch, location.search, refresh]);
  const filteredProducts = product?.filter(
    (product) => product.categoryDetailChosen === detail
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts?.slice(
    offset,
    offset + productsPerPage
  );
  console.log(filteredProducts);
  const handleClickDelete = (productId) => {
    console.log("dele");
    deleteProduct(productId);
    setRefresh(!refresh);
  };

  const handleClickReset = (productId) => {
    resertProduct(productId);
    setRefresh(!refresh);
  };

  const handlDeleteDetail = ( productId, sizeId ) => {

    deleteDetailProduct(productId, sizeId);
    setRefresh(!refresh);

  };

  const handlResetDetail = ( productId, sizeId ) => {

    resetDetailProduct(productId, sizeId);
    setRefresh(!refresh);

  };
  return (
    <div>
      <ListProductLayout
        handleClickDelete={handleClickDelete}
        handleClickReset={handleClickReset}
        handlDeleteDetail={handlDeleteDetail}
        handlResetDetail={handlResetDetail}
        product={currentProducts}
      />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredProducts?.length / productsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default ListProductPage;
