import { useLocation } from "react-router-dom";
import ProductPage from "../../components/productPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../product/productPage.css";
import { getAllBrand } from "../../service/apiCustomer";
function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isCategory, setIsCategory] = useState("");
  const [productFilter, setProductFilter] = useState([])
  const [productCategory, setProductCategory] = useState([]);
  const [product, setProduct] = useState([]);
  // const [cart, setCart] = useState([]);

  // const addCart = (product) => {
  //   setCart([...cart, product]);
  // };
  
  const [isID, setIsId] = useState("");
  const productPage = useSelector(
    (state) => state.product?.allProduct?.productData
  );
  const categoryGet = useSelector(
    (state) => state.category?.allCategory?.categoryData
  );
  const Brand = useSelector((state) => state.brands?.allBrand?.brandData);
  const handleCategoryProduct = (categoryName) => {
    const filterProductCategory = productPage.filter(
      (item) => item.categoryDetailChosen === categoryName
    );
    setProduct(filterProductCategory);
  };
  const showAllProducts = () => {
    const filterProduct = productPage.filter(
      (item) => item?.idCategory._id === isID
    );
      setProductFilter(filterProduct);
    setProduct(filterProduct);
  };
  const handleClickBrand = (nameBrand) => {
    const filterProductWithBrand = productFilter?.filter(
      (item) => item.brandChonse === nameBrand
    );
    setProduct(filterProductWithBrand)
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    if (id) {
      getAllBrand(id, dispatch);
    }
    showAllProducts();
    setIsCategory(category);
    setIsId(id);
    // dispatch(menuSuccess(false))

    const filterCategory = categoryGet.filter((item) => item._id === id);
    setProductCategory(filterCategory);
  }, [location, productPage, isCategory, dispatch]);
  return (
    <div className="product-page">
      <div className="sidebar-product">
        <h5 style={{textTransform: "uppercase" , color: "rgb(24, 167, 189)"}} onClick={() => showAllProducts()}>{isCategory}</h5>
        <hr />
        {productCategory.map((category, index) =>
          category.categoryDetails.map((detail, i) => (
            <p className="category-name-sidebar" onClick={() => handleCategoryProduct(detail.name)} key={i}>
              {detail.name}
            </p>
          ))
        )}
        <hr />
        <div className="brand-container">
          {Brand?.codeBrand.map((brand) => (
            <div className="brand-item" key={brand._id}>
              <img
                onClick={() => handleClickBrand(brand.nameBrand)}
                className="img-brand"
                src={brand.imgBrand}
              />
            </div>
          ))}
        </div>
       
      </div>
      <div className="content-product">
        <ProductPage products={product} />
      </div>
    </div>
  );
}

export default Product;
