import { Modal } from "react-bootstrap";

function ModalMessage(props) {
    const {show , handleClose, message} = props;
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-mess-dialog"
      contentClassName="modal-mess-content"
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">{message}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ModalMessage;
