import { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBrand } from "../../Redux/apiProduct";

function Search(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const brand = useSelector((state) => state.brands.getAllBrand?.allBrand);
  const [isBrand, setIsBrand] = useState([])
  const dispatch = useDispatch();
  
  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    props.onchangeBrand(selectedOptions);
  };
  const data = isBrand?.map((brand) => {
    return {value: brand._id, label: `${brand.codeBrand}: ${brand.nameBrand}`}
  })
  const customStyles = {
    input: (provided) => ({
      ...provided,
      borderRadius: "4px",
      padding: "10px",
      width: "200px",
      outline: "none",
    }),
  };
  useEffect(() => {
    getAllBrand(dispatch)
    setIsBrand(brand)
  }, [dispatch]);
  return (
    <div>
      <div className="mt-1 mb-3">
        <Select
          isMulti
          options={data}
          styles={customStyles}
          onChange={handleChange}
          value={selectedOptions}
        />
      </div>
    </div>
  );
}

export default Search;
