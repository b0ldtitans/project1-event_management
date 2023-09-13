import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalContent, setModalIsOpen } from "../features/modal/modalSlice";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "black",
    width: "50%",
    height: "70%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComponent = ({ children }) => {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setModalIsOpen(false));
    dispatch(setModalContent("register"));
  }

  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <div className="text-white cursor-pointer" onClick={closeModal}>
        Close
      </div>
      {children}
    </Modal>
  );
};

export default ModalComponent;
