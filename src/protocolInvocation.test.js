import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import {
  handleStoreLink,
  handleSendMail,
  handleOpenInEmacsBrowser,
  handleCopySelection,
  handleCapture,
  handleCaptureWithTemplate,
  handleAutomaticCapture,
} from "./protocolInvocation";
jest.mock("./activeTabData");

describe("The protocol handlers", () => {
  const tabUpdateMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    getActiveTab.mockImplementation(() => Promise.resolve({ id: 18 }));
    getSelectionFromTab.mockImplementation(() => Promise.resolve("exampleSelection"));
    getUrlAndTitleFromTab.mockReturnValue({ title: "exampleTitle", url: "exampleUrl" });
    window.browser = {
      tabs: {
        update: tabUpdateMock,
      },
    };
    window.close = jest.fn();
    tabUpdateMock.mockReset();
  });

  it("sends the correct protocol invocation for storing a link", async () => {
    await handleStoreLink();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://store-link?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for sending a mail", async () => {
    await handleSendMail();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://email?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for opening a browser", async () => {
    await handleOpenInEmacsBrowser();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://textbrowser?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for copying the selection", async () => {
    await handleCopySelection();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://cpsel?selection=exampleSelection",
    });
  });

  it("sends the correct protocol invocation for general capture", async () => {
    await handleCapture();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection",
    });
  });

  it("sends the correct protocol invocation for capture with a given template", async () => {
    await handleCaptureWithTemplate("J")();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection&template=J",
    });
  });

  it("sends the correct protocol invocation for automatic capture without detected template", async () => {
    await handleAutomaticCapture();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection",
    });
  });

  it("sends the correct protocol invocation for automatic capture without detected template (JIRA URL)", async () => {
    getUrlAndTitleFromTab.mockReturnValue({
      title: "exampleTitle",
      url: "https://jira.somewhere.com/browse/TM-3479",
    });
    await handleAutomaticCapture();
    expect(tabUpdateMock).toBeCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=https%3A%2F%2Fjira.somewhere.com%2Fbrowse%2FTM-3479&body=exampleSelection&template=J",
    });
  });
});
