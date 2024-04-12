import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBrandOfProduct, updateProduct } from "../../Redux/apiProduct";
import SearchBrand from "../../components/searchBrandProductAdd";
import AddProduct from "../../components/ProductAdd";
import { uploadFiles } from "../../Redux/apiRequest";
import { Spinner } from "react-bootstrap";
import ModalForm from "../../components/Modal";

function UpdateProductPage() {
  const location = useLocation();
  const product = useSelector(
    (state) => state.products.getAllProducts?.allProduct
  );

  const [nameProduct, setNameProduct] = useState("");
  const [sizes, setSizes] = useState([
    { size: "", price: "", img: null, quantity: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [message, setMessage] = useState("");
  const [idImageProduct, setIdImageProduct] = useState("");
  const [idProductDetails, setIdProductDetails] = useState("");
  const [imageProduct, setImageProduct] = useState();
  const [decription, setDiscription] = useState("");
  const [select, setSelect] = useState(null);
  const [brand, setBrand] = useState([]);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      const productOne = product.find((item) => item._id === id);
      setIdProduct(productOne._id);
      setIdImageProduct(productOne?.idImageProduct._id);
      setIdProductDetails(productOne?.idProductDetails._id);
      setSelect(productOne?.brandChonse);
      setNameProduct(productOne.nameProduct);
      setSizes(productOne?.idProductDetails.sizeProducts);
      setImageProduct(productOne?.idImageProduct.nameImageProduct);
      setDiscription(productOne?.idProductDetails.descriptionProducts);
      getBrandOfProduct(productOne?.idCategory._id).then((data) => {
        setBrand(data);
      });
    }
  }, [location]);
  const handleSearch = (selectedOption) => {
    setSelect(selectedOption);
  };
  const handleNameChage = (nameProduct) => {
    setNameProduct(nameProduct);
  };
  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    const sizeCopy = Object.assign({}, updatedSizes[index]);
    sizeCopy.size = value;
    updatedSizes[index] = sizeCopy;
    setSizes(updatedSizes);
  };

  const handlePriceChange = (index, value) => {
    const updatedSizes = [...sizes];
    const sizeCopy = Object.assign({}, updatedSizes[index]);
    sizeCopy.price = value;
    updatedSizes[index] = sizeCopy;
    setSizes(updatedSizes);
  };
console.log(sizes);
  const handleImageChange = (index, value) => {
    const updatedSizes = [...sizes];
    const sizeCopy = Object.assign({}, updatedSizes[index]);
    sizeCopy.img = value;
    updatedSizes[index] = sizeCopy;
    setSizes(updatedSizes);
  };
  const handleQuantityChange = (index, value) => {
    const updatedSizes = [...sizes];
    const sizeCopy = Object.assign({}, updatedSizes[index]);
    sizeCopy.quantity = value;
    updatedSizes[index] = sizeCopy;
    setSizes(updatedSizes);
  };
  const addSize = () => {
  
    setSizes([...sizes, { size: "", price: "", img: null, quantity: "" }]);
  };
  const handleImageProductChange = (img) => {
    setImageProduct(img);
  };
  const handleDecriptionChange = (decriptionProduct) => {
    setDiscription(decriptionProduct);
  };
  const imgArray = sizes.map((imgProductSize) => {
    return imgProductSize.img;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgProductDetails = await uploadFiles(imgArray);
    const updatedProductDetails = sizes.map((product, i) => {
      console.log(product._id);
      return {
        _id: product._id, 
        size: product.size,
        price: product.price,
        quantity: product.quantity,
        img: imgProductDetails.thisUrl[i],
      };
    });
    let updateFileImage = imageProduct;
    if (imageProduct?.length === 0) {
      updateFileImage = [
        "data:image/png;base64,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",
      ];
    }
    const files = await uploadFiles(updateFileImage);
    if (files) {
      const updateNewProduct = {
        idProduct: idProduct,
        idImageProduct: idImageProduct,
        idProductDetails: idProductDetails,
        nameProduct: nameProduct,
        sizeProduct: updatedProductDetails,
        imageProduct: files.thisUrl,
        decriptionProduct: decription,
        brandChonse: select,
      };
      await updateProduct(updateNewProduct).then((data) => {
        setMessage(data);
        setShow(true);
        setIsLoading(false);
      });
    }
  };
  return (
    <div>
      <SearchBrand brand={brand} select={select} handleSearch={handleSearch} />
      <AddProduct
        sizes={sizes}
        handleSizeChange={handleSizeChange}
        handlePriceChange={handlePriceChange}
        handleImageChange={handleImageChange}
        handleQuantityChange={handleQuantityChange}
        nameProduct={nameProduct}
        handleNameChage={handleNameChage}
        imageProduct={imageProduct}
        decription={decription}
        addSize={addSize}
        handleImageProductChange={handleImageProductChange}
        handleDecriptionChange={handleDecriptionChange}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        <div>
          <Spinner className="load-brand" animation="grow" />
          <Spinner className="load-brand" animation="grow" />
        </div>
      ) : (
        <ModalForm message={message} show={show} handleClose={handleClose} />
      )}
    </div>
  );
}

export default UpdateProductPage;
