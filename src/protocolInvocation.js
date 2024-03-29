import { assoc, curry, pipe } from "ramda";
import { getActiveTab, getUrlAndTitleFromTab } from "./activeTabData";
import { getJiraTask, getSelectionFromTab } from "./contentCapture";
import {
  capture,
  copySelection,
  createBranch,
  openInEmacsBrowser,
  sendMail,
  storeLink,
  timesheet,
} from "./org";
import { NO_ISSUE_SELECTED_MESSAGE } from "./messages";

const closePopup = () => {
  setTimeout(() => window.close(), 100);
};

const invokeWithUrlAndTitle = (protocolHandler) => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await protocolHandler(urlAndTitle);
  closePopup();
};

const invokeWithUrlAndTitleAndSelection = (protocolHandler) => async () => {
  const activeTab = await getActiveTab();
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await protocolHandler({ ...urlAndTitle, body: selection });
  closePopup();
};

export const handleCapture = invokeWithUrlAndTitleAndSelection(capture);

const captureWithTemplate = curry(pipe(assoc("template"), capture));

export const handleCaptureWithTemplate = pipe(
  captureWithTemplate,
  invokeWithUrlAndTitleAndSelection
);

export const handleStoreLink = invokeWithUrlAndTitle(storeLink);
export const handleSendMail = invokeWithUrlAndTitle(sendMail);
export const handleOpenInEmacsBrowser = invokeWithUrlAndTitle(openInEmacsBrowser);

export const handleCopySelection = async () => {
  const activeTab = await getActiveTab();
  const selection = await getSelectionFromTab(activeTab);
  await copySelection({ selection });
  closePopup();
};

export const handleAutomaticCapture = invokeWithUrlAndTitleAndSelection(capture);

function formatIssueTimesheetDescription({ issue, parent }) {
  if (parent) {
    return `${parent.id} ${issue.id} ${issue.title}`;
  } else {
    return `${issue.id} ${issue.title}`;
  }
}

export const handleTimesheetEntryForIssue = async () => {
  const issueData = await getJiraTask();
  if (issueData) {
    timesheet({ description: formatIssueTimesheetDescription(issueData) });
  } else {
    alert(NO_ISSUE_SELECTED_MESSAGE);
  }
  closePopup();
};

export const handleCreateBranchFromIssue = async () => {
  const issueData = await getJiraTask();
  if (issueData) {
    const parentData = issueData.parent ? { parent: issueData.parent.id } : {};
    createBranch({
      issue: issueData.issue.id,
      title: issueData.issue.title,
      ...parentData,
    });
  } else {
    alert(NO_ISSUE_SELECTED_MESSAGE);
  }
  closePopup();
};
