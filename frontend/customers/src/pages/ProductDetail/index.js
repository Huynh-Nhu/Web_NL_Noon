import { useEffect, useState } from "react";
import ProductDetailLayout from "../../components/ProductDetailLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { addProductCart, getProductDetail } from "../../service/apiCustomer";
import { useDispatch, useSelector } from "react-redux";
import RelatedProduct from "../../components/RelatedProduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isId, setId] = useState("");
  const [idDetail, setIdDetail] = useState("");
  const [related, setRelated] = useState([]);
  const [showRelated, setShowRelated] = useState(false);
  const customer = useSelector(
    (state) => state?.loginCustom?.login?.currentCustomer
  );
  const detail = useSelector(
    (state) => state.detail?.allDetail?.detailData?.product
  );
  const nameDetail = useSelector(
    (state) => state.detail?.allDetail?.detailData?.products
  );

  const product = useSelector(
    (state) => state.product?.allProduct?.productData
  );

  const addCart = (product) => {
    
    addProductCart(product).then((data) => {
      toast.success(data, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const idProductDetail = searchParams.get("idDetail");
    setId(id);

    setIdDetail(idProductDetail);
    if (id && idProductDetail) {
      getProductDetail(id, idProductDetail, dispatch).then(() => {
        setShowRelated(true);
      });
    }
  }, [location, dispatch, nameDetail, product]);
  useEffect(() => {
    if (detail) {
      const productRelated = product.filter(
        (item) => item.idCategory && item.idCategory.nameCategory === nameDetail
      );
      setRelated(productRelated);
    }
  }, [detail, product, nameDetail]);

  return (
    <div>
      <ProductDetailLayout
        detail={detail}
        idDetail={idDetail}
        addCart={addCart}
        customer={customer}
      />
      {showRelated && <RelatedProduct id={isId} related={related} />}
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ProductDetail;
