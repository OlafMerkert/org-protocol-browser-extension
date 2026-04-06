chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.kind === "grab-selection") {
    const selection = getSelection();
    sendResponse({ selection: selection?.toString() ?? "" });
  }
});
