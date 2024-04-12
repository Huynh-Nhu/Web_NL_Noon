import { Modal } from "react-bootstrap";


function ModalConfetti(props) {
    const {show , handleClose, message} = props;
    return (  <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="modal-mess-dialog"
        contentClassName="modal-mess-content"
        
      >
        <Modal.Header className="bg-success" closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div>
            <img style={{width: "50%"}} src="/assets/thank/thank-you.png" />
       <h4>   {message}</h4>

          </div>
          </Modal.Body>
      </Modal> );
}

export default ModalConfetti;