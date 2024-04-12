import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BrandLayout from "../../components/BrandLayout";
import { deleteLoadFiles, uploadFiles } from "../../Redux/apiRequest";
import { updateBrand } from "../../Redux/apiProduct";
import ModalForm from "../../components/Modal";
import { Spinner } from "react-bootstrap";

function UpdateBrand() {
  const location = useLocation();
  const Brand = useSelector((state) => state.brands.getAllBrand?.allBrand);
  const filterBrand = Brand?.filter((item) => item !== null);
  const [idBrand, setIdBrand] = useState("")
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

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (typeof imgBrand === "string") {
      const newBrand = {
        idBrand: idBrand, 
        nameBrand: nameBrand,
        imgBrand: imgBrand,
      };
      await updateBrand(newBrand).then((data) => {
        setMessage(data);
        setShow(true);
        setIsLoading(false);
      });
    } else {
      const files = await uploadFiles(imgBrand);

      if (files) {
        const newBrand = {
        idBrand: idBrand, 
          nameBrand: nameBrand,
          imgBrand: files.thisUrl,
        };
       const data = await updateBrand(newBrand)
          setMessage(data);
          setShow(true);
          setIsLoading(false);
       if(data === "không cập nhật thành công"){
        deleteLoadFiles(files.thisId)
       }
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    if (id) {
      const branOne = filterBrand.find((item) => item._id === id);
      setNameBrand(branOne?.nameBrand);
      setImgBrand(branOne?.imgBrand);
      setIdBrand(id)
    }
  }, [location]);

  return (
    <div >
      <BrandLayout
        nameBrand={nameBrand}
        imgBrand={imgBrand}
        handleNameBrandChange={handleNameBrandChange}
        handleImgBrandChange={handleImgBrandChange}
        handleSubmit={handleUpdateBrand}
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

export default UpdateBrand;
