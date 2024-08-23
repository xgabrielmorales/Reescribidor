let hashes = {};

export const getHashedData = (hash) => {
  return hashes[hash];
};

export const startProcess = (currentClickedElement) => {
  const hash = crypto.randomUUID();

  if (!currentClickedElement) {
    console.log("CurrentClickedElement is not defined or valid.");
    return null;
  }

  hashes[hash] = {
    element: currentClickedElement,
    selection: window.getSelection(),
    start: currentClickedElement.selectionStart,
    end: currentClickedElement.selectionEnd,
  };

  return hash;
};

export const replaceTextInEditable = (data, text) => {
  if (!data.element.isContentEditable || !data.selection) return null;

  data.selection.deleteFromDocument();

  if (data.selection.rangeCount === 0) {
    data.selection.addRange(document.createRange());
  }

  const range = data.selection.getRangeAt(0);
  const textNode = document.createTextNode(text);

  range.insertNode(textNode);
  range.setStartAfter(textNode);

  selection.removeAllRanges();
  selection.addRange(range);
};

export const replaceTextInField = (data, text) => {
  const { element, start, end } = data;

  element.value =
    element.value.slice(0, start) + text + element.value.substr(end);

  const event = new Event("input", { bubbles: true });
  element.dispatchEvent(event);
};
