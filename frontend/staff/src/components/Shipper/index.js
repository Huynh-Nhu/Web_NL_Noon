import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { getShipper } from "../../Redux/apiProduct";

function Shipper(props) {
  const { show, handleClose, selectedItems,handleSendShipper } = props;

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [shippers, setShippers] = useState([]);
  const allShippers = useSelector((state) => state.shipper?.shipper?.allShipper);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const data = shippers?.map((shipper) => ({
    value: shipper?.idStaff?._id,
    label: ` ${shipper?.idStaff?.nameStaff}`,
  }));

  const customStyles = {
    input: (provided) => ({
      ...provided,
      borderRadius: "4px",
      padding: "10px",
      width: "200px",
      outline: "none",
    }),
  };

  const handleSendShipperSend = () => {
    if (selectedOption) {
      const selectedShipperId = selectedOption.value;
      handleSendShipper(selectedShipperId, selectedItems)
      
    }
  };

  useEffect(() => {
    getShipper(dispatch);
    setShippers(allShippers);
  }, [dispatch]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Select
          options={data}
          styles={customStyles}
          onChange={handleChange}
          value={selectedOption}
        />
        {selectedOption && <h4>{selectedOption.label}</h4>}
        {selectedItems.map((item) => (
          <p key={item}>Mã đơn hàng: {item}</p>
        ))}
        <Button onClick={handleSendShipperSend}>Gửi</Button>
      </Modal.Body>
    </Modal>
  );
}

export default Shipper;