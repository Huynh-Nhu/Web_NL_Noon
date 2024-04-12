import { useRef, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import AddProduct from "../../components/ProductAdd";
import { uploadFiles } from "../../Redux/apiRequest";
import { Link, useLocation } from "react-router-dom";
import { addProduct, getBrandOfProduct } from "../../Redux/apiProduct";
import ModalForm from "../../components/Modal";
import SearchBrand from "../../components/searchBrandProductAdd";

function ProductAddPage() {
  const location = useLocation();
  const [idCate, setCate] = useState("");
  const [detail, setDetail] = useState(" ");
  const [nameProduct, setProduct] = useState("");
  const [sizes, setSizes] = useState([
    { size: "", price: "", img: null, quantity: "" },
  ]);
  const [imageProduct, setImageProduct] = useState();
  const [decription, setDiscription] = useState("");
  const [brand, setBrand] = useState([]);
  const [select, setSelect] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const detailName = searchParams.get("detailName");
    setDetail(detailName);
    setCate(id);
    getBrandOfProduct(id).then((data) => {
      setBrand(data);
    });
  }, [location]);
  const handleSearch = (selectedOption) => {
    setSelect(selectedOption);
  };
  const handleNameChage = (nameProduct) => {
    setProduct(nameProduct);
  };
  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].size = value;
    setSizes(updatedSizes);
  };

  const handlePriceChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].price = value;
    setSizes(updatedSizes);
  };

  const handleImageChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].img = value;
    setSizes(updatedSizes);
  };
  const handleQuantityChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].quantity = value;
    setSizes(updatedSizes);
  };
  const addSize = () => {
    setSizes([...sizes, { size: "", price: "", img: null, quantity: "" }]);
  };
  const handleImageProductChange = (img) => {
    setImageProduct(img);
  };

  const imgArray = sizes.map((imgProductSize) => {
    return imgProductSize.img;
  });

  const handleDecriptionChange = (decriptionProduct) => {
    setDiscription(decriptionProduct);
  };
  const resetInputs = () => {
    setProduct("");
    setDiscription("");
    setImageProduct();
    setSizes([{ size: "", price: "", img: null, quantity: "" }]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (imageProduct === undefined) {
      alert("Vui lòng chọn ít nhất một tệp tin ảnh.");
      setIsLoading(false);
      return;
    } else {
      const imgProductDetails = await uploadFiles(imgArray);
      const updatedProductDetails = sizes.map((product, i) => {
        return {
          size: product.size,
          price: product.price,
          quantity: product.quantity,
          img: imgProductDetails.thisUrl[i],
        };
      });
      const files = await uploadFiles(imageProduct);
      if (files) {
        const newProduct = {
          idCategory: idCate,
          nameProduct: nameProduct,
          nameCategoryDetail: detail,
          sizeProduct: updatedProductDetails,
          imageProduct: files.thisUrl,
          decriptionProduct: decription,
          brandChonse: select,
        };

        await addProduct(newProduct).then((data) => {
          setMessage(data);
          setShow(true);
          setIsLoading(false);
          resetInputs();
        });
      }
    }
  };
  return (
    <div>
      <SearchBrand brand={brand} handleSearch={handleSearch} />
      <AddProduct
        sizes={sizes}
        nameProduct={nameProduct}
        imageProduct={imageProduct}
        decription={decription}
        handleNameChage={handleNameChage}
        handleSizeChange={handleSizeChange}
        handlePriceChange={handlePriceChange}
        handleImageChange={handleImageChange}
        handleQuantityChange={handleQuantityChange}
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

export default ProductAddPage;
