import "../../components/Modal/modal.css";
import { Modal } from "react-bootstrap";
function ModalForm(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      dialogClassName="modal-mess-dialog"
      contentClassName="modal-mess-content"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default ModalForm;
