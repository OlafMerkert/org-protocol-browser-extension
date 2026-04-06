import type { IssueData } from "./types";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.kind === "grab-jira-task") {
    const issueData = getIssue();
    if (issueData) {
      sendResponse({ status: "issue-found", ...issueData });
    } else {
      sendResponse({ status: "no-issue-found" });
    }
  }
});

function getSelectedCard(): Element | null {
  return document.querySelector(".ghx-issue.ghx-selected");
}

function getSwimlaneOf(element: Element | null): Element | null {
  if (!element) {
    return null;
  }

  let current: Element | null = element;
  while (current && ![...current.classList].includes("ghx-swimlane")) {
    current = current.parentElement;
  }

  return current;
}

function getSelectedSwimlane(): Element | null {
  return document.querySelector(".ghx-swimlane-header.ghx-selected");
}

function getCardData(card: Element): { id: string; title: string } | null {
  const keyEl = card.querySelector(".ghx-key");
  const summaryEl = card.querySelector(".ghx-summary");
  if (!keyEl || !summaryEl) return null;
  return {
    id: keyEl.textContent ?? "",
    title: summaryEl.textContent ?? "",
  };
}

function stripFlagged(text: string) {
  if (text.startsWith("Flagged")) {
    return text.substring("Flagged".length);
  } else {
    return text;
  }
}

function getSwimlaneData(lane: Element): { id: string; title: string } | null {
  const keyElement = lane.querySelector(".ghx-parent-key");
  const summaryElement = lane.querySelector(".ghx-summary");
  if (keyElement && summaryElement) {
    return {
      id: keyElement.textContent ?? "",
      title: stripFlagged(summaryElement.textContent ?? ""),
    };
  } else {
    return null;
  }
}

function getTicketDataFromBoard(): IssueData | null | undefined {
  const selectedCard = getSelectedCard();
  if (selectedCard) {
    const cardData = getCardData(selectedCard);
    if (!cardData) return null;

    const parentOfSelected = getSwimlaneOf(selectedCard);

    if (parentOfSelected) {
      const swimlaneData = getSwimlaneData(parentOfSelected);
      return { issue: cardData, ...(swimlaneData ? { parent: swimlaneData } : {}) };
    } else {
      return { issue: cardData };
    }
  } else {
    const selectedLane = getSelectedSwimlane();
    if (selectedLane) {
      const swimlaneData = getSwimlaneData(selectedLane);
      if (swimlaneData) {
        return { issue: swimlaneData };
      }
    }
    return undefined;
  }
}

function getIssueFromDetailPage(): { id: string; title: string } | null {
  const keyVal = document.querySelector("#key-val");
  const summaryVal = document.querySelector("#summary-val");
  if (!keyVal || !summaryVal) return null;
  const issueKey = keyVal.getAttribute("data-issue-key");
  if (!issueKey) return null;
  return {
    id: issueKey,
    title: summaryVal.textContent ?? "",
  };
}

function getParentFromDetailPage(): { id: string } | null {
  const parentIssue = document.querySelector("#parent_issue_summary");
  if (parentIssue) {
    const key = parentIssue.getAttribute("data-issue-key");
    if (key) {
      return { id: key };
    }
  }
  return null;
}

function getTicketDataFromDetailPage(): IssueData | null {
  const issue = getIssueFromDetailPage();
  if (!issue) return null;
  const parent = getParentFromDetailPage();
  if (parent) {
    return { issue, parent };
  } else {
    return { issue };
  }
}

function isDetailPage(): Element | null {
  return document.querySelector(".issue-view");
}

function isBoard(): Element | null {
  return document.querySelector("#ghx-pool");
}

function getIssue(): IssueData | null | undefined {
  if (isDetailPage()) {
    return getTicketDataFromDetailPage();
  } else if (isBoard()) {
    return getTicketDataFromBoard();
  }
  return undefined;
}
