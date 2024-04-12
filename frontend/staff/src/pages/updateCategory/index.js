import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Search from "../../components/Select";
import FormCategory from "../../components/FormAddCategory";
import { uploadFiles } from "../../Redux/apiRequest";
import { updatedCategory } from "../../Redux/apiProduct";
import { Col, Row, Spinner } from "react-bootstrap";
import ModalForm from "../../components/Modal";
import "../updateCategory/updateCategory.css"
function UpdateCategory() {
  const location = useLocation();
  const [idCategory, setIdCategory] = useState("");
  const [selectBrand, setSelectBrand] = useState([]);
  const [brand, setBrand] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([
    { name: "", img: null },
  ]);
  const [nameCategory, setNameCategory] = useState("");
  const [imgCategory, setImgCategory] = useState();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const categorySendRedux = useSelector(
    (state) => state.category.getAllCategory?.allCate
  );
  const brandSave = useSelector((state) => state.brands.getAllBrand.allBrand);
  const onchangeBrand = (e) => {
    setSelectBrand(e);
  };
  const onchangeNameCategory = (name) => {
    setNameCategory(name);
  };
  const onchangeImageCategory = (image) => {
    setImgCategory(image);
  };
  const handleNameChange = (index, value) => {
    const updatedCategoryDetails = [...categoryDetails];
    const detailCopy = Object.assign({}, updatedCategoryDetails[index]);
    detailCopy.name = value;
    updatedCategoryDetails[index] = detailCopy;

    setCategoryDetails(updatedCategoryDetails);
  };
  const handleImageChange = (index, value) => {
    const updatedCategoryDetails = [...categoryDetails];
    const detailCopy = Object.assign({}, updatedCategoryDetails[index]);
    detailCopy.img = value;
    updatedCategoryDetails[index] = detailCopy;

    setCategoryDetails(updatedCategoryDetails);
  };

  const addCategoryDetals = () => {
    setCategoryDetails([...categoryDetails, { name: "", img: null }]);
  };
  const imgArray = categoryDetails.map((imgDetails) => {
    return imgDetails.img;
  });

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgCategoryDetails = await uploadFiles(imgArray);
    const updatedCategoryDetails = categoryDetails.map((category, index) => {
      return {
        name: category.name,
        img: imgCategoryDetails.thisUrl[index],
      };
    });

    const Select = selectBrand.map((category) => category.value);
    const brandIds = brand.map((brand) => brand._id);
    const newBrand = [...Select, ...brandIds];
    const files = await uploadFiles(imgCategory);
    if (files) {
      const newCategory = {
        nameBrand: newBrand,
        categoryDetails: updatedCategoryDetails,
        nameCategory: nameCategory,
        imgCategory: files.thisUrl,
        idCategory: idCategory,
      };

      await updatedCategory(newCategory).then((data) => {
        setMessage(data);
        setShow(true);
        setIsLoading(false);
      });
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    setIdCategory(id);
    if (id) {
      const categoryOne = categorySendRedux.find((item) => item._id === id);
      const brandInData = brandSave.filter((item) =>
        categoryOne?.codeBrand.includes(item._id)
      );
      setCategoryDetails(categoryOne?.categoryDetails);
      setBrand(brandInData);
      setNameCategory(categoryOne?.nameCategory);
      setImgCategory(categoryOne?.imgCategory);
    }
  }, [location]);
  return (
    <div>
      <Search onchangeBrand={onchangeBrand} />
      <p>Brand đã có</p>
      <div className="d-flex justify-content-around">
        {brand.map((brd) => (
          <div className="brand-item" key={brd._id}>
            <img style={{ width: "50px", height: "50px" }} src={brd.imgBrand} />
  
            {/* <button onClick={() => handleDelete(brd._id)}>Delete</button> */}
          </div>
        ))}
      </div>
      {categoryDetails.map((category, index) => (
        <div key={index}>
          <Form>
            <Row className="mb-3">
                <Form.Label htmlFor={`name${index}`}>Tên danh mục:</Form.Label>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  id={`name${index}`}
                  value={category.name}
                  onChange={(event) =>
                    handleNameChange(index, event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    handleImageChange(index, event.target.files[0])
                  }
                ></Form.Control>
                
              </Form.Group>
              <Form.Group as={Col}>
              {category.img && (
                  <div>
                    {typeof category.img === "string" ? (
                      <img
                      className="rounded"
                        src={category.img}
                        alt="Hình ảnh sản phẩm"
                        style={{ width: "200px", height: "200px" ,}}
                      />
                    ) : (
                      <img
                      className="rounded"
                        src={URL.createObjectURL(category.img)}
                        alt="Hình ảnh sản phẩm"
                        style={{ width: "200px", height: "200px" }}
                      />
                    )}
                  </div>
                )}
              </Form.Group>
            </Row>
          </Form>
        </div>
      ))}
      <button
        className="btn btn-dark mt-2"
        type="button"
        onClick={addCategoryDetals}
      >
        Thêm danh mục
      </button>
      <FormCategory
        nameCategory={nameCategory}
        imgCategory={imgCategory}
        onchangeNameCategory={onchangeNameCategory}
        onchangeImageCategory={onchangeImageCategory}
        handleSubmit={handleUpdateCategory}
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

export default UpdateCategory;
