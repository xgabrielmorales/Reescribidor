import { Prompts } from "./OpenAI/prompts/index.js";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.contextMenus.create({
    id: "spellingAndGrammar",
    title: "Spelling and Grammar",
    type: "normal",
    contexts: ["editable"],
  });
  await chrome.contextMenus.create({
    id: "summary",
    title: "Summary",
    type: "normal",
    contexts: ["editable"],
  });
  await chrome.contextMenus.create({
    id: "translate",
    title: "Translate",
    type: "normal",
    contexts: ["editable"],
  });
  await chrome.contextMenus.create({
    id: "translateEnToEs",
    parentId: "translate",
    title: "English to Spanish",
    type: "normal",
    contexts: ["editable"],
  });
  await chrome.contextMenus.create({
    id: "translateEsToEN",
    parentId: "translate",
    title: "Spanish to English",
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
      const promptID = contextMenuItem.menuItemId;
      const userMessage = contextMenuItem.selectionText;

      if (!userMessage) {
        console.error("No hay mensaje del usuario...");
        return null;
      }

      const prompt = Prompts[promptID];
      if (typeof prompt !== "function") {
        console.error("No se encontró la acción...");
        return null;
      }

      return prompt(userMessage)
        .then((response) => showResult(contextMenuItem, tab, hash, response))
        .catch(() => console.error("Error processing the action"));
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
