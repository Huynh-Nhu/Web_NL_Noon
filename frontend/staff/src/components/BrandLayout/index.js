import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../BrandLayout/brandLayout.css";
import { useEffect, useState } from "react";
function BrandLayout(props) {
  const [imgLib, setImgLib] = useState();
  const handleNameChange = (e) => {
    const name = e.target.value;
    props.handleNameBrandChange(name);
  };

  useEffect(() => {
    return () => {
      if (imgLib && imgLib?.length > 0) {
        imgLib.map((img) => {
          URL.revokeObjectURL(img);
        });
      }
    };
  }, [imgLib]);
  const handleImg = (e) => {
    const img = Array.from(e.target.files);
    props.handleImgBrandChange(img);
    setImgLib(img);
  };

  const renderImg = () => {
    if (imgLib && imgLib?.length > 0) {
      return imgLib?.map((img, index) => (
        <img
          className="img-logo-brand"
          key={index}
          src={URL.createObjectURL(img)}
        />
      ));
    }
    return null;
  };
  useEffect(() => {
    if (props.imgBrand === undefined) {
      setImgLib([]);
    }
  }, [props.imgBrand]);

  return (
    <div className="form-brand contaier row">
      <div className=" row content-brand ">
        <div className="col-6 m-0 " style={{alignSelf: "center"}}>
          <div className="img-brand-update">
            {renderImg() ? (
              <div>{renderImg()}</div>
            ) : (
              <img className="img-null" src={props.imgBrand} />
            )}
          </div>
        </div>
        <div className="col-6 m-0">
          <Form onSubmit={props.handleSubmit} className="form-brand-content">
            <Form.Group as={Row} className="mb-3" controlId="nameBrand">
              <Form.Label column sm={2}>
                Tên:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  value={props.nameBrand}
                  onChange={handleNameChange}
                  type="text"
                  placeholder=""
                />
              </Col>
            </Form.Group>

            <Form.Group controlId="imgBrand" className="mb-3 ">
              <div className="input-group form-brand-edit  rounded-pill ">
                <input
                  id="upload"
                  name="imageProduct"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImg}
                  className="form-control d-none"
                />
                <div className="input-group-append">
                  <label
                    htmlFor="upload"
                    className="btn btn-light m-0 rounded-pill px-4"
                  >
                    <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                    <small className="text-uppercase font-weight-bold text-muted">
                      Update Image
                    </small>
                  </label>
                  <div className="btn-brand">
                    <Button type="submit">
                      Cập Nhật
                    </Button>
                  </div>
                </div>
                <div className="mx-4"></div>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default BrandLayout;
