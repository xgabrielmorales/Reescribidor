import { Prompts } from "./OpenAI/prompts/index.js";

const handleEditableText = (contextMenuItem, tab) => {
  chrome.tabs.sendMessage(
    tab.id,
    { type: "StartProcessing" },
    { frameId: contextMenuItem.frameId },
    (hash) => {
      const promptID = contextMenuItem.menuItemId;
      const userSelectedText = contextMenuItem.selectionText;

      if (!userSelectedText) {
        console.debug("The user has not selected text.");
        return null;
      }

      const prompt = Prompts[promptID];
      if (typeof prompt !== "function") {
        console.debug("No prompt was found for the selected action.");
        return null;
      }

      return prompt(userSelectedText)
        .then((response) => showResult(contextMenuItem, tab, hash, response))
        .catch(() => console.error("Error processing the action"));
    },
  );
};

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

export default handleEditableText;
