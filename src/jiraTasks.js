chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.kind === "grab-jira-task") {
    console.log("grabbing text");
    const content = "";
    console.log({ content });
    sendResponse({ content });
  }
});

const getSelectedCard = () => document.querySelector(".ghx-issue.ghx-selected");

const getSwimlaneOf = (element) => {
  if (!element) {
    return null;
  }

  while (![...element.classList].includes("ghx-swimlane")) {
    element = element.parentElement;
  }

  return element;
};

const getSelectedSwimlane = () => document.querySelector(".ghx-swimlane-header.ghx-selected");

const getCardData = (card) => ({
  id: card.querySelector(".ghx-key").textContent,
  title: card.querySelector(".ghx-summary").textContent,
});

const stripFlagged = (text) => {
  if (text.startsWith("Flagged")) {
    return text.substring("Flagged".length);
  } else {
    return text;
  }
};

const getSwimlaneData = (lane) => {
  const keyElement = lane.querySelector(".ghx-parent-key");
  if (keyElement) {
    return {
      id: keyElement.textContent,
      title: stripFlagged(lane.querySelector(".ghx-summary").textContent),
    };
  } else {
    return null;
  }
};

const getTicketDataFromBoard = () => {
  const selectedCard = getSelectedCard();
  if (selectedCard) {
    const parentOfSelected = getSwimlaneOf(selectedCard);

    if (parentOfSelected) {
      return { issue: getCardData(selectedCard), parent: getSwimlaneData(parentOfSelected) };
    } else {
      return { issue: getCardData(selectedCard) };
    }
  } else {
    const selectedLane = getSelectedSwimlane();
    if (selectedLane) {
      return { issue: getSwimlaneData(selectedLane) };
    }
  }
};
