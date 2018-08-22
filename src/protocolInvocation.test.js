import { getActiveTab, getSelectionFromTab, getUrlAndTitleFromTab } from "./activeTabData";
import {
  handleStoreLink,
  handleSendMail,
  handleOpenInEmacsBrowser,
  handleCopySelection,
  handleCapture,
  handleCaptureWithTemplate,
} from "./protocolInvocation";
jest.mock("./activeTabData");

describe("The protocol handlers", () => {
  const tabUpdateMock = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    getActiveTab.mockImplementation(() => Promise.resolve({ id: 18 }));
    getSelectionFromTab.mockImplementation(() => Promise.resolve("exampleSelection"));
    getUrlAndTitleFromTab.mockReturnValue({ title: "exampleTitle", url: "exampleUrl" });

    global.browser = {
      tabs: {
        update: tabUpdateMock,
      },
    };
    tabUpdateMock.mockReset();
  });

  it("sends the correct protocol invocation for storing a link", async () => {
    await handleStoreLink();
    expect(tabUpdateMock).toBeCalledWith({
      url: "org-protocol://store-link?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for sending a mail", async () => {
    await handleSendMail();
    expect(tabUpdateMock).toBeCalledWith({
      url: "org-protocol://email?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for opening a browser", async () => {
    await handleOpenInEmacsBrowser();
    expect(tabUpdateMock).toBeCalledWith({
      url: "org-protocol://w3m?title=exampleTitle&url=exampleUrl",
    });
  });

  it("sends the correct protocol invocation for copying the selection", async () => {
    await handleCopySelection();
    expect(tabUpdateMock).toBeCalledWith({
      url: "org-protocol://cpsel?selection=exampleSelection",
    });
  });

  it("sends the correct protocol invocation for general capture", async () => {
    await handleCapture();
    expect(tabUpdateMock).toBeCalledWith({
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection",
    });
  });

  it("sends the correct protocol invocation for capture with a given template", async () => {
    await handleCaptureWithTemplate("J")();
    expect(tabUpdateMock).toBeCalledWith({
      url:
        "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection&template=J",
    });
  });
});