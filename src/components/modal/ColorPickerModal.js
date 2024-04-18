import { HexColorPicker } from "react-colorful";

const ColorPickerModal = ({ isOpen, color, onChange, action, setIsOpen }) => {
  const close = (e) => {
    if (e.target.classList.contains("color-modal")) {
      setIsOpen(false);
    }
  };

  return (
    <div className={`color-modal ${isOpen ? "active" : null}`} onClick={close}>
      <div className="color-modal-content">
        <button className="color-modal__button custom-button" onClick={action}>
          Set Color
        </button>
        <HexColorPicker color={color} onChange={onChange} />
      </div>
    </div>
  );
};

export default ColorPickerModal;
