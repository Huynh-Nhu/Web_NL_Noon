import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../ProductAdd/productAdd.css";
import { Col, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { updateTextFields } from "materialize-css";
function AddProduct({
  sizes,
  handleSizeChange,
  handlePriceChange,
  addSize,
  imageProduct,
  decription,
  nameProduct,
  handleNameChage,
  handleImageChange,
  handleDecriptionChange,
  handleSubmit,
  handleImageProductChange,
  handleQuantityChange,
}) {
  const [imagePreview, setImagePreview] = useState([]);
  const handleName = (e) => {
    const name = e.target.value;
    handleNameChage(name);
  };
  const handleDecription = (e) => {
    const decription = e.target.value;
    handleDecriptionChange(decription);
  };

  const handleImagePreview = (acceptedFiles) => {
    const previewImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    handleImageProductChange(previewImages);
    setImagePreview(previewImages);
  };

  const handleRemoveImage = (index) => {
    const updatePreview = [...imagePreview];
    updatePreview.splice(index, 1);
    setImagePreview(updatePreview);
    handleImageProductChange(updatePreview)
   
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImagePreview,
  });
  useEffect(() => {
    if (imageProduct === undefined) {
      setImagePreview([]);
    }
  }, [imageProduct]);
 
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nameProduct">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control value={nameProduct} onChange={handleName} type="text" />
        </Form.Group>

        {sizes.map((size, index) => (
          <div key={index} className='size-price-row"'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId={`sizeProduct${index}`}>
                <Form.Label>Kích thước sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={size.size}
                  onChange={(event) =>
                    handleSizeChange(index, event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`priceProduct${index}`}>
                <Form.Label>Giá sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={size.price}
                  onChange={(event) =>
                    handlePriceChange(index, event.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`imgProduct${index}`}>
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) =>
                    handleImageChange(index, event.target.files[0])
                  }
                ></Form.Control>
                {size.img && (
                  <div>
                    {typeof size.img === "string" ? (
                      <img
                        src={size.img}
                        alt="Hình ảnh sản phẩm"
                        style={{ width: "100px", height: "150px" }}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(size.img)}
                        alt="Hình ảnh sản phẩm"
                        style={{ width: "100px", height: "150px" }}
                      />
                    )}
                  </div>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId={`quantityProduct${index}`}>
                <Form.Label>Số lượng sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  value={size.quantity}
                  onChange={(event) =>
                    handleQuantityChange(index, event.target.value)
                  }
                />
              </Form.Group>
            </Row>
          </div>
        ))}
        <Button variant="primary" type="button" onClick={addSize}>
          Thêm size
        </Button>
        <div className="image-upload-container" {...getRootProps()}>
          <input
            onChange={handleImageProductChange}
            accept=".png, .jpg, .jpeg"
            {...getInputProps()}
          />
          <p>Kéo và thả ảnh hoặc nhấp để chọn ảnh</p>
        </div>

        {imagePreview.length  > 0   ? (
          <div>
            <h5>Anh</h5>
            <div className="preview-container">
              {imagePreview.map((file, index) => (
                <div key={index} className="image-preview">
                  <div className="image-preview-item">
                    <img
                      className="image-product"
                      src={file.preview}
                      alt={`Preview ${index}`}
                    />
                    <button
                      className="remove-image-button"
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="preview-container">
            {imageProduct?.map((imgURL, index) => (
              <div key={index} className="image-preview">
                <img
                  className="image-product"
                  src={imgURL}
                  alt={`Image ${index}`}
                />
              </div>
            ))}
          </div>
        )}
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Thông tin sản phẩm </Form.Label>
          <Form.Control
            value={decription}
            onChange={handleDecription}
            as="textarea"
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddProduct;
