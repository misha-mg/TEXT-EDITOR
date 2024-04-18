function ColorPickerButton({ handleAction, actionType, activeColor }) {
  return (
    <>
      <button
        style={{ background: activeColor }}
        className="tool-btn"
        onClick={() => handleAction(actionType)}
      ></button>
    </>
  );
}

export default ColorPickerButton;
