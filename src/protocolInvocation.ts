import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import { getJiraTask } from "./contentCapture";
import { NO_ISSUE_SELECTED_MESSAGE } from "./messages";
import {
  capture,
  copySelection,
  createBranch,
  findGitLogs,
  openInEmacsBrowser,
  sendMail,
  storeLink,
  timesheet,
} from "./org";
import type { IssueData, ProtocolHandler } from "./types";

const closePopup = () => {
  setTimeout(() => window.close(), 100);
};

const invokeWithUrlAndTitle = (protocolHandler: ProtocolHandler) => async () => {
  const activeTab = await getActiveTab();
  if (!activeTab) return;
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  await protocolHandler(urlAndTitle as Record<string, string>);
  closePopup();
};

const invokeWithUrlAndTitleAndSelection = (protocolHandler: ProtocolHandler) => async () => {
  const activeTab = await getActiveTab();
  if (!activeTab) return;
  const urlAndTitle = getUrlAndTitleFromTab(activeTab);
  const selection = await getSelectionFromTab(activeTab);
  await protocolHandler({ ...urlAndTitle, body: selection } as Record<string, string>);
  closePopup();
};

export const handleCapture = invokeWithUrlAndTitleAndSelection(capture);

const captureWithTemplate =
  (template: string): ProtocolHandler =>
  (params) =>
    capture({ ...params, template });

export const handleCaptureWithTemplate = (template: string) =>
  invokeWithUrlAndTitleAndSelection(captureWithTemplate(template));

export const handleStoreLink = invokeWithUrlAndTitle(storeLink);
export const handleSendMail = invokeWithUrlAndTitle(sendMail);
export const handleOpenInEmacsBrowser = invokeWithUrlAndTitle(openInEmacsBrowser);

export const handleCopySelection = async () => {
  const activeTab = await getActiveTab();
  if (!activeTab) return;
  const selection = await getSelectionFromTab(activeTab);
  await copySelection({ selection });
  closePopup();
};

function formatIssueTimesheetDescription({ issue, parent }: IssueData) {
  if (parent) {
    return `${parent.id} ${issue.id} ${issue.title ?? ""}`;
  } else {
    return `${issue.id} ${issue.title ?? ""}`;
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

export const handleFindGitLogs = async () => {
  const issueData = await getJiraTask();
  if (issueData) {
    findGitLogs({ issue: issueData.issue.id });
  } else {
    alert(NO_ISSUE_SELECTED_MESSAGE);
  }
  closePopup();
};
