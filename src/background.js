import { spellingAndGrammar } from "./OpenAI/prompts/index.js";

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "spellingAndGrammar",
    title: "Spelling and Grammar",
    type: "normal",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener((contextMenuItem, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    { type: "StartProcessing" },
    { frameId: contextMenuItem.frameId },
    (hash) => {
      if (!contextMenuItem.selectionText) {
        console.info("You must select a text to use this action");
        return null;
      }

      if (contextMenuItem.menuItemId === "spellingAndGrammar") {
        spellingAndGrammar(contextMenuItem.selectionText)
          .then((response) => showResult(contextMenuItem, tab, hash, response))
          .catch((_) => console.error("Error processing spelling and grammar"));
      }
    },
  );
});

function showResult(contextMenuItem, tab, hash, response) {
  if (!(response && response.choices && response.choices.length > 0)) {
    return null;
  }

  chrome.tabs.sendMessage(
    tab.id,
    {
      type: "ReplaceText",
      text: response.choices[0].message.content,
      hash: hash,
    },
    { frameId: contextMenuItem.frameId },
  );
}
