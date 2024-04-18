import { useState } from "react";
import { compareObjects } from "../../app/utils";

function StructureSection({ currentRef }) {
  const [jsonData, setJsonData] = useState("");

  const mergeAdjacentElements = (contentArray) => {
    const mergedContent = [];
    for (let i = 0; i < contentArray.length; i++) {
      const current = contentArray[i];
      const next = contentArray[i + 1];
      if (
        next &&
        current.type === next.type &&
        compareObjects(current.styles, next.styles)
      ) {
        const mergedElement = {
          ...current,
          content: current.content + next.content,
        };
        mergedContent.push(mergedElement);
        i++;
      } else {
        mergedContent.push(current);
      }
    }
    return mergedContent;
  };

  let editorContent = [];
  const processNode = (node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.textContent.trim().length > 0
    ) {
      const styles = {};
      if (node.hasAttribute("style")) {
        const stylesString = node.getAttribute("style");
        const stylesArray = stylesString
          .split(";")
          .map((style) => style.trim());
        stylesArray.forEach((style) => {
          const [property, value] = style.split(":").map((s) => s.trim());
          if (property && value) {
            styles[property] = value;
          }
        });
      }
      const nodeInfo = {
        content: node.textContent,
      };
      if (styles && Object.keys(styles).length > 0) {
        nodeInfo.styles = styles;
      }
      editorContent.push(nodeInfo);
    } else if (
      node.nodeType === Node.TEXT_NODE &&
      node.textContent.trim().length > 0
    ) {
      const nodeInfo = {
        content: node.textContent.trim(),
      };
      editorContent.push(nodeInfo);
    }
  };

  const creactJSONData = () => {
    editorContent.splice(0);
    currentRef.current.childNodes.forEach(processNode);
    // let result = mergeAdjacentElements(editorContent);
    let result = editorContent;

    setJsonData(JSON.stringify(result, null, 2));
  };

  return (
    <>
      <div className="json-structure">
        <h2>JSON structure</h2>
        <button
          className="json-structure__button custom-button"
          onClick={creactJSONData}
        >
          create json structure
        </button>

        {jsonData.length > 2 ? (
          <div className="json-structure__content">
            <pre>{jsonData}</pre>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default StructureSection;
