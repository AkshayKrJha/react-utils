import { Modal } from "react-bootstrap";
export function ModalView({
  isOpen,
  toggleModal,
  children,
  onExited,
  title,
}: {
  isOpen: any;
  toggleModal: any;
  children: any;
  onExited?: any;
  title?: any;
}) {
  return (
    <Modal
      show={isOpen}
      onHide={toggleModal}
      onExited={onExited}
      centered
      size="xl"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>{title || "Modal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
