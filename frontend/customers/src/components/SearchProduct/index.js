import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "../SearchProduct/searchProduct.css"

function SearchProduct(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { data } = props;

  const options = data?.flatMap((item) =>
    item.sizeProducts.map((sizeProduct) => ({
      value: item.nameProduct,
      label: (
        <Link
          to={{
            pathname: "/productDetail",
            search: `?id=${item._id}&idDetail=${sizeProduct.id}`,
          }}
          className="product-link"
        >
          <div className="product-option">
            <div className="product-option-image">
              <img
                src={sizeProduct.img}
                alt=""
                className="img-search"
              />
            </div>
            <div className="product-option-label">
              <p >{item.nameProduct}</p>
            </div>
          </div>
        </Link>
      ),
    }))
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "25px",
      borderColor: state.isFocused ? "#000" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #000" : null,
      "&:hover": {
        borderColor: state.isFocused ? "#000" : "#ccc"
      }
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
    }),
  };

  return (
    <div className="search-home">
      <Select
        options={options}
        styles={customStyles}
        value={selectedOptions}
        placeholder="Tìm kiếm sản phẩm"
      />
    </div>
  );
}

export default SearchProduct;