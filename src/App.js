import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.scss";
import "../src/styles/app.scss";
import ColorPickerModal from "./components/modal/ColorPickerModal";
import ToolButton from "./components/buttons/ToolButton";
import ColorPickerButton from "./components/buttons/ColorPickerButton";
import FontSizeSelect from "./components/select/FontSizeSelect";
import StructureSection from "./components/sections/StructureSection";
import { removingEmptyTegs, styleElement } from "./app/utils";

function App() {
  const DEFAULT_TEXT_COLOR = "rgb(107, 206, 197)";
  const DEFAULT_TEXT_BG = "rgb(173, 72, 172)";

  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectedFontValue, setSelectedFontValue] = useState("");
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [textBGColor, setTextBGColor] = useState(DEFAULT_TEXT_BG);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [colorModalType, setColorModalType] = useState("text");
  const [currenrModalColor, setCurrenrModalColor] = useState("");

  // COLOR BLOCK

  const colorModalAction = (type) => {
    setColorModalType(type);
    setColorModalOpen(!colorModalOpen);
  };

  const setCurrentColor = () => {
    colorModalAction();
    if (colorModalType === "text") {
      setTextColor(currenrModalColor);
    } else if (colorModalType === "background") {
      setTextBGColor(currenrModalColor);
    }
  };

  // REF CONTROL

  const wasActive = useRef(false);
  useEffect(() => {
    if (
      wasActive.current &&
      (editorContent.length === 0 || editorContent === "<br>")
    ) {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      let selectedHtml = range.cloneContents();
      range.deleteContents();
      range.insertNode(selectedHtml);
    } else if (editorContent.length > 0) {
      wasActive.current = true;
    }
  }, [editorContent]);

  // GET/STYLE TEXT

  const styleValues = useMemo(
    () => [textColor, textBGColor, selectedFontValue],
    [textColor, textBGColor, selectedFontValue]
  );
  useEffect(() => {
    styleValues.splice(0);
    styleValues.push(textColor);
    styleValues.push(textBGColor);
    styleValues.push(selectedFontValue);
  }, [textColor, textBGColor, selectedFontValue, styleValues]);

  const textProcessing = (action) => {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let selectedHtml = range.cloneContents();
    let wasText = false;
    selectedHtml.childNodes.forEach((node) => {
      if (node.textContent === "") {
        return;
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        node = styleElement(node, action, styleValues);
      } else if (node.nodeType === Node.TEXT_NODE) {
        let tagNode = styleElement(node, action, styleValues);
        const container = range.commonAncestorContainer;
        const parentElement =
          container.nodeType === Node.TEXT_NODE
            ? container.parentElement
            : container;
        const spanElement = parentElement.closest("span");

        if (spanElement) {
          wasText = true;
          const beforeSpan = document.createElement("span");
          const afterSpan = document.createElement("span");

          beforeSpan.setAttribute("style", spanElement.getAttribute("style"));
          tagNode.setAttribute("style", spanElement.getAttribute("style"));
          afterSpan.setAttribute("style", spanElement.getAttribute("style"));

          const beforeRange = document.createRange();
          const afterRange = document.createRange();

          beforeRange.setStartBefore(spanElement);
          beforeRange.setEnd(range.startContainer, range.startOffset);
          afterRange.setStart(range.endContainer, range.endOffset);
          afterRange.setEndAfter(spanElement);

          const contentBefore = beforeRange.cloneContents();
          const contentAfter = afterRange.cloneContents();

          beforeSpan.textContent = contentBefore.textContent;
          afterSpan.textContent = contentAfter.textContent;
          tagNode = styleElement(tagNode, action, styleValues);

          let combinedHTML = "";
          const spans = [beforeSpan, tagNode, afterSpan];
          spans.forEach((item) => {
            if (item.innerHTML !== "") {
              combinedHTML += item.outerHTML;
            }
          });

          spanElement.insertAdjacentHTML("afterend", combinedHTML);
          const parentElement = spanElement.parentElement;
          parentElement.removeChild(spanElement);

          return;
        } else {
          node.parentNode.replaceChild(tagNode, node);
        }
      }
    });

    if (wasText) {
      return;
    } else {
      range.deleteContents();

      range.insertNode(selectedHtml);
    }
    removingEmptyTegs(editorRef);
  };

  return (
    <div>
      <header>
        <div className="container">
          <h1>
            TEXT EDITOR<br></br> FOR "Redentu"
          </h1>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="editor">
            <div className="editor-tools">
              <div className="tool-group">
                <ToolButton
                  actionType="fontSize"
                  handleAction={textProcessing}
                />
                <FontSizeSelect
                  setValue={setSelectedFontValue}
                  value={selectedFontValue}
                />
              </div>

              <ToolButton
                actionType="font-weight"
                handleAction={textProcessing}
              />
              <ToolButton actionType="italic" handleAction={textProcessing} />
              <ToolButton
                actionType="underline"
                handleAction={textProcessing}
              />

              <div className="tool-group">
                <ToolButton
                  actionType="textColor"
                  handleAction={textProcessing}
                />
                <ColorPickerButton
                  handleAction={colorModalAction}
                  actionType="text"
                  activeColor={textColor}
                />
              </div>

              <div className="tool-group">
                <ToolButton
                  actionType="backgroundColor"
                  handleAction={textProcessing}
                />
                <ColorPickerButton
                  handleAction={colorModalAction}
                  actionType="background"
                  activeColor={textBGColor}
                />
              </div>
            </div>
            <div
              className="editor-field"
              ref={editorRef}
              contentEditable={true}
              onInput={() =>
                setEditorContent((state) => editorRef.current.innerHTML)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            ></div>
          </div>

          <StructureSection currentRef={editorRef} />
        </div>

        <ColorPickerModal
          isOpen={colorModalOpen}
          setIsOpen={setColorModalOpen}
          action={setCurrentColor}
          onChange={setCurrenrModalColor}
          color={currenrModalColor}
        />
      </main>
    </div>
  );
}

export default App;
