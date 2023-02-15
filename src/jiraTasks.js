chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.kind === "grab-jira-task") {
    const issueData = getIssue();
    if (issueData) {
      sendResponse({ status: "issue-found", ...issueData });
    } else {
      sendResponse({ status: "no-issue-found" });
    }
  }
});

function getSelectedCard() {
  return document.querySelector(".ghx-issue.ghx-selected");
}

function getSwimlaneOf(element) {
  if (!element) {
    return null;
  }

  while (![...element.classList].includes("ghx-swimlane")) {
    element = element.parentElement;
  }

  return element;
}

function getSelectedSwimlane() {
  return document.querySelector(".ghx-swimlane-header.ghx-selected");
}

function getCardData(card) {
  return {
    id: card.querySelector(".ghx-key").textContent,
    title: card.querySelector(".ghx-summary").textContent,
  };
}

function stripFlagged(text) {
  if (text.startsWith("Flagged")) {
    return text.substring("Flagged".length);
  } else {
    return text;
  }
}

function getSwimlaneData(lane) {
  const keyElement = lane.querySelector(".ghx-parent-key");
  if (keyElement) {
    return {
      id: keyElement.textContent,
      title: stripFlagged(lane.querySelector(".ghx-summary").textContent),
    };
  } else {
    return null;
  }
}

function getTicketDataFromBoard() {
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
}

function getIssueFromDetailPage() {
  return {
    id: document.querySelector("#key-val").attributes["data-issue-key"].value,
    title: document.querySelector("#summary-val").textContent,
  };
}

function getParentFromDetailPage() {
  const parentIssue = document.querySelector("#parent_issue_summary");
  if (parentIssue) {
    return { id: parentIssue.attributes["data-issue-key"].value };
  }
}

function getTicketDataFromDetailPage() {
  const issue = getIssueFromDetailPage();
  const parent = getParentFromDetailPage();
  if (parent) {
    return { issue, parent };
  } else {
    return issue;
  }
}

function isDetailPage() {
  return document.querySelector(".issue-view");
}

function isBoard() {
  return document.querySelector("#ghx-pool");
}

function getIssue() {
  if (isDetailPage()) {
    return getTicketDataFromDetailPage();
  } else if (isBoard()) {
    return getTicketDataFromBoard();
  }
}
