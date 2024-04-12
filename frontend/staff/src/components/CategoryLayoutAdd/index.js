import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../CategoryLayoutAdd/categoryAdd.css";
import Search from "../Select";
import Form from "react-bootstrap/Form";

import FormCategory from "../FormAddCategory";
import { uploadFiles } from "../../Redux/apiRequest";
import { addCategory } from "../../Redux/apiProduct";
import Alert from "react-bootstrap/Alert";
import { Row, Spinner, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

function CategoryLayoutAdd(props) {
  const dispatch = useDispatch();
  const [selectBrand, setSelectBrand] = useState([]);
  const [nameCategory, setNameCategory] = useState("");
  const [imgCategory, setImgCategory] = useState();
  const [categoryDetails, setCategoryDetails] = useState([
    { name: "", img: null },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [img,setImg] = useState()

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
    updatedCategoryDetails[index].name = value;

    setCategoryDetails(updatedCategoryDetails);
  };
  const handleImageChange = (index, value) => {
    const updatedCategoryDetails = [...categoryDetails];
    updatedCategoryDetails[index].img = value;

    setCategoryDetails(updatedCategoryDetails);
  };

  const addCategoryDetals = () => {
    setCategoryDetails([...categoryDetails, { name: "", img: null }]);
  };
  const imgArray = categoryDetails.map((imgDetails) => {
    return imgDetails.img;
  });
  const resetInputs = () => {
    setSelectBrand([])
    setNameCategory("")
    setImgCategory()
    setCategoryDetails([
      { name: "", img: null },
    ])
  }
  const handleAddcategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgCategoryDetails = await uploadFiles(imgArray);
    const updatedCategoryDetails = categoryDetails.map((category, index) => {
      return {
        name: category.name,
        img: imgCategoryDetails.thisUrl[index],
      };
    });

    const files = await uploadFiles(imgCategory);
    const Select = selectBrand.map((category) => category.value);
    if (files) {
      const newCategory = {
        nameBrand: Select,
        categoryDetails: updatedCategoryDetails,
        nameCategory: nameCategory,
        imgCategory: files.thisUrl,
      };
      await addCategory(newCategory, dispatch).then((data) => {
        setShowAlert(true);
        setIsLoading(false);
        setSuccessMessage(data);
        resetInputs()
      });
    }
  };

  return (
    <div>
      <Modal
        {...props}
        aria-labelledby="example-modal-add"
        dialogClassName="custom-modal-dialog"
        contentClassName="custom-modal-content"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-add">Thêm loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Search onchangeBrand={onchangeBrand} />
          {categoryDetails.map((category, index) => (
            <div key={index}>
              <Form.Label htmlFor={`name${index}`}>Tên danh mục:</Form.Label>
              <Form.Control
                type="text"
                id={`name${index}`}
                value={category.name}
                onChange={(event) =>
                  handleNameChange(index, event.target.value)
                }
              />
              <Form.Control
                type="file"
                onChange={(event) =>
                  handleImageChange(index, event.target.files[0])
                }
              ></Form.Control>
            </div>
          ))}

          <button type="button" className="btn btn-dark mt-3" onClick={addCategoryDetals}>
            Thêm danh mục
          </button>
          <FormCategory
            nameCategory={nameCategory}
            imgCategory={imgCategory}
            onchangeNameCategory={onchangeNameCategory}
            onchangeImageCategory={onchangeImageCategory}
            handleSubmit={handleAddcategory}
          />
          {isLoading ? (
            <div>
              <Spinner className="loading" animation="grow" />
            </div>
          ) : (
            showAlert && (
              <Alert className="alert-add-cate">
                <p className="text-alert">{successMessage}</p>
              </Alert>
            )
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CategoryLayoutAdd;
