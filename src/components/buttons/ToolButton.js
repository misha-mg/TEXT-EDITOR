function ToolButton({ handleAction, actionType }) {
  return (
    <>
      {actionType === "font-weight" ? (
        <button className="tool-btn" onClick={() => handleAction("bold")}>
          <img src="/img/bold-text-icon.png" alt="Bold-icon" />
        </button>
      ) : actionType === "textColor" ? (
        <button className="tool-btn" onClick={() => handleAction("textColor")}>
          <img src="/img/text-color-icon.png" alt="Color-icon"></img>
        </button>
      ) : actionType === "italic" ? (
        <button className="tool-btn" onClick={() => handleAction("italic")}>
          <img src="/img/italic-icon.png" alt="Italic-icon"></img>
        </button>
      ) : actionType === "fontSize" ? (
        <button className="tool-btn" onClick={() => handleAction("fontSize")}>
          <img src="/img/text-size-icon.png" alt="font-size-icon"></img>
        </button>
      ) : actionType === "underline" ? (
        <button className="tool-btn" onClick={() => handleAction("underline")}>
          <img src="/img/underlined-text-icon.png" alt="Underline-icon"></img>
        </button>
      ) : actionType === "backgroundColor" ? (
        <button
          className="tool-btn"
          onClick={() => handleAction("backgroundColor")}
        >
          <img src="/img/text-bg-icon.png" alt="background-icon"></img>
        </button>
      ) : null}
    </>
  );
}

export default ToolButton;
