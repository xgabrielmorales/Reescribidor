import {
  startProcess,
  getHashedData,
  replaceTextInField,
  replaceTextInEditable,
  showLoadingIndicator,
  removeLoadingIndicator,
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
    showLoadingIndicator();
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

    removeLoadingIndicator();
  }

  if (message.type === "ShowPopUpWindowWithResponseText") {
    fetch(chrome.runtime.getURL("static/popup/popup.html"))
      .then((response) => response.text())
      .then((html) => {
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = chrome.runtime.getURL("static/popup/popup.css");
        document.head.appendChild(style);

        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = html;
        popupContainer.querySelector("#popup-content").innerText = message.text;
        popupContainer.querySelector("#close-popup").onclick = () => {
          document.body.removeChild(popupContainer);
        };

        document.body.appendChild(popupContainer);
      });

    removeLoadingIndicator();
  }

  return true;
});
