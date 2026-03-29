chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.kind === "grab-selection") {
    sendResponse({ selection: getSelection().toString() });
  }
});
