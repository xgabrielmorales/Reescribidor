import handleEditableText from "./editable.js";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "spellingAndGrammar",
    title: "Spelling and Grammar",
    type: "normal",
    contexts: ["editable"],
  });
  chrome.contextMenus.create({
    id: "summary",
    title: "Summary",
    type: "normal",
    contexts: ["selection", "editable"],
  });
  chrome.contextMenus.create({
    id: "translate",
    title: "Translate",
    type: "normal",
    contexts: ["editable"],
  });
  chrome.contextMenus.create({
    id: "translateEnToEs",
    parentId: "translate",
    title: "English to Spanish",
    type: "normal",
    contexts: ["editable"],
  });
  chrome.contextMenus.create({
    id: "translateEsToEN",
    parentId: "translate",
    title: "Spanish to English",
    type: "normal",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener((contextMenuItem, tab) => {
  if (contextMenuItem.editable) {
    return handleEditableText(contextMenuItem, tab);
  }
});
