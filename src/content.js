import {
  startProcess,
  getHashedData,
  replaceTextInField,
  replaceTextInEditable,
} from "./common.js";

let currentClickedElement = null;

document.addEventListener(
  "contextmenu",
  (event) => {
    currentClickedElement = event.target;
  },
  true,
);

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "StartProcessing") {
    const hash = startProcess(currentClickedElement);
    sendResponse(hash);
  }

  if (message.type === "ReplaceText") {
    const hashedData = getHashedData(message.hash);

    if (!hashedData) return null;

    if (hashedData.element.isContentEditable) {
      replaceTextInEditable(hashedData, message.text);
    } else {
      replaceTextInField(hashedData, message.text);
    }
  }

  if (message.type === "ShowPopUpWindowWithResponseText") {
    const hashedData = getHashedData(message.hash);

    const selection = hashedData.selection;
    const range = selection.getRangeAt(0);

    const parentElement = range.commonAncestorContainer.parentNode;
    const rect = parentElement.getBoundingClientRect();

    const popup = document.createElement("div");

    popup.style.position = "absolute";
    popup.style.top = `${rect.top + window.scrollY - 50}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.backgroundColor = "white";
    popup.style.color = "black";
    popup.style.border = "1px solid black";
    popup.style.padding = "10px";
    popup.style.zIndex = "10000";
    popup.innerText = message.text;

    const closeButton = document.createElement("button");
    closeButton.innerText = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "10px";
    closeButton.style.border = "none";
    closeButton.style.background = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";
    closeButton.onclick = () => {
      document.body.removeChild(popup);
    };

    popup.appendChild(closeButton);

    document.body.appendChild(popup);
  }

  return true;
});
