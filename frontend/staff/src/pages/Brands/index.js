import { useState } from "react";
import BrandLayout from "../../components/BrandLayout";
import axios from "axios";
import { addBrand } from "../../Redux/apiRequest";
import { uploadFiles } from "../../Redux/apiRequest";
import { deleteLoadFiles } from "../../Redux/apiRequest";
import ModalForm from "../../components/Modal";
import { Spinner } from "react-bootstrap";
import "../Brands/BrandPage.css"
import { useDispatch } from "react-redux";

function BrandPage() {
  const dispatch = useDispatch()
  const [nameBrand, setNameBrand] = useState("");
  const [imgBrand, setImgBrand] = useState();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleNameBrandChange = (nameBrand) => {
    setNameBrand(nameBrand);
  };
  const handleImgBrandChange = (imgBrand) => {
    setImgBrand(imgBrand);
  };
  const handleAddBrand = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const files = await uploadFiles(imgBrand);
    if (files) {
      const newBrand = {
        nameBrand: nameBrand,
        imgBrand: files,
      };
      const result = await addBrand(newBrand, dispatch);
      
        setMessage(result);
        setShow(true)
        setIsLoading(false)
        setNameBrand("")
        setImgBrand()
      if (result === "Brand đã tồn tại") {
        deleteLoadFiles(files.thisId)
          .then((response) => {
            console.log("File deleted:", response);
          })
          .catch((error) => {
            console.error("Error deleting file:", error);
          });
      }
    }
  };

  return (
    <div>
      <BrandLayout
        nameBrand={nameBrand}
        imgBrand={imgBrand}
        handleNameBrandChange={handleNameBrandChange}
        handleImgBrandChange={handleImgBrandChange}
        handleSubmit={handleAddBrand}
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

export default BrandPage;
