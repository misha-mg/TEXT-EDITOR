import { HexColorPicker } from "react-colorful";

const Modal = ({ isOpen, color, onChange, action, setIsOpen }) => {
  function closeModal(e) {
    if (e.target.classList.contains("color-modal")) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className={`color-modal ${isOpen ? "active" : null}`}
      onClick={(e) => closeModal(e)}
    >
      <div className="color-modal-content">
        <button className="color-modal__button custom-button" onClick={action}>
          Set Color
        </button>
        <HexColorPicker color={color} onChange={onChange} />
      </div>
    </div>
  );
};

export default Modal;
