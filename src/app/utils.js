export function styleElement(node, action, styleValues) {
  const [textColor, textBGColor, selectedFontValue] = styleValues;
  let currentTag;
  if (node.nodeType === Node.ELEMENT_NODE) {
    currentTag = node;
  } else if (node.nodeType === Node.TEXT_NODE) {
    const newSpan = document.createElement("span");
    newSpan.textContent = node.textContent;
    currentTag = newSpan;
  }

  switch (action) {
    case "bold":
      if (currentTag.style.fontWeight) {
        currentTag.style.removeProperty("font-weight");
        break;
      }
      currentTag.style.fontWeight = "bold";
      break;
    case "italic":
      if (currentTag.style.fontStyle) {
        currentTag.style.removeProperty("font-style");
        break;
      }
      currentTag.style.fontStyle = "italic";
      break;
    case "underline":
      if (currentTag.style.textDecoration) {
        currentTag.style.removeProperty("text-decoration");
        break;
      }
      currentTag.style.textDecoration = "underline";
      break;

    case "textColor":
      if (currentTag.style.color) {
        currentTag.style.removeProperty("color");
        break;
      }
      currentTag.style.color = textColor;
      break;

    case "backgroundColor":
      if (currentTag.style.background) {
        currentTag.style.removeProperty("background");
        break;
      }
      currentTag.style.background = textBGColor;
      break;

    case "fontSize":
      currentTag.style.fontSize = selectedFontValue + "px";
      break;
    default:
      break;
  }
  return currentTag;
}

export function removingEmptyTegs(ref) {
  let editorContent = ref.current.innerHTML;
  let tempElement = document.createElement("div");
  tempElement.innerHTML = editorContent;

  for (let i = tempElement.childNodes.length - 1; i >= 0; i--) {
    let child = tempElement.childNodes[i];
    if (child.nodeType === 1) {
      if (!child.innerHTML.trim()) {
        tempElement.removeChild(child);
      }
    }
  }
  ref.current.innerHTML = tempElement.innerHTML;
}

export function compareObjects(obj1, obj2) {
  if (!obj1 && !obj2) {
    return true;
  } else if (!obj1 || !obj2) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
