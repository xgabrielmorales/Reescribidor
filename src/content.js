import {
  startProcess,
  changeEditable,
  getHashedData,
  changeField,
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
      changeEditable(hashedData, message.text);
    } else {
      changeField(hashedData, message.text);
    }
  }

  return true;
});
