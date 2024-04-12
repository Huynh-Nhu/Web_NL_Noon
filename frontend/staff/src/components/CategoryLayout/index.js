import { Link } from "react-router-dom";
import "../CategoryLayout/products.css";
import CategoryLayoutAdd from "../CategoryLayoutAdd";
import { useEffect, useState } from "react";
import CardCategory from "../ListCategory";
import { getAllCategory } from "../../Redux/apiProduct";
import { useDispatch, useSelector } from "react-redux";
function CategoryLayout() {
  const categorys = useSelector(
    (state) => state.category?.getAllCategory.allCate
  );
  const [category, setcategory] = useState(categorys);
  const [modalShow, setmodalShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setcategory(categorys);
  }, [categorys]);
  useEffect(() => {
    getAllCategory(dispatch)
  }, [modalShow, dispatch]);
  return (
    <div className="product-page position-relative">
      <h1>Loại sản phẩm</h1>
      <div className="incon-add-product position-absolute top-0 end-0">
        <i
          className="fa-solid fa-circle-plus add-products"
          onClick={() => setmodalShow(true)}
        ></i>
        <CategoryLayoutAdd
          show={modalShow}
          onHide={() => setmodalShow(false)}
        />
      </div>
      <div>
        <CardCategory category={category} />
      </div>
    </div>
  );
}

export default CategoryLayout;
