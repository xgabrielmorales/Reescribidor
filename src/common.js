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

  if (currentClickedElement.isContentEditable) {
    hashes[hash] = {
      element: currentClickedElement,
      selection: window.getSelection(),
    };
  } else {
    hashes[hash] = {
      element: currentClickedElement,
      start: currentClickedElement.selectionStart,
      end: currentClickedElement.selectionEnd,
    };
  }

  return hash;
};

export const changeEditable = (data, text) => {
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

export const changeField = (data, text) => {
  setTimeout(() => {
    data.element.value =
      data.element.value.slice(0, data.start) +
      text +
      data.element.value.substr(data.end);

    const event = new Event("input", { bubbles: true });
    data.element.dispatchEvent(event);
  }, 0);
};
