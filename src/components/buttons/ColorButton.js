function ColorButton({ handleAction, actionType, activeColor }) {
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

export default ColorButton;
