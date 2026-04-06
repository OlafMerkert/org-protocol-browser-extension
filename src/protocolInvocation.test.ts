import { beforeEach, describe, expect, mock, test } from "bun:test";
import {
  handleCapture,
  handleCaptureWithTemplate,
  handleCopySelection,
  handleOpenInEmacsBrowser,
  handleSendMail,
  handleStoreLink,
} from "./protocolInvocation";

mock.module("./activeTabData", () => ({
  getActiveTab: () => Promise.resolve({ id: 18 }),
  getSelectionFromTab: () => Promise.resolve("exampleSelection"),
  getUrlAndTitleFromTab: () => ({ title: "exampleTitle", url: "exampleUrl" }),
}));

describe("The protocol handlers", () => {
  const tabUpdateMock = mock(() => Promise.resolve());

  beforeEach(() => {
    window.chrome = {
      tabs: {
        update: tabUpdateMock,
      },
    } as any;
    window.close = mock();
    tabUpdateMock.mockReset();
  });

  test("sends the correct protocol invocation for storing a link", async () => {
    await handleStoreLink();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://store-link?title=exampleTitle&url=exampleUrl",
    });
  });

  test("sends the correct protocol invocation for sending a mail", async () => {
    await handleSendMail();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://email?title=exampleTitle&url=exampleUrl",
    });
  });

  test("sends the correct protocol invocation for opening a browser", async () => {
    await handleOpenInEmacsBrowser();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://textbrowser?title=exampleTitle&url=exampleUrl",
    });
  });

  test("sends the correct protocol invocation for copying the selection", async () => {
    await handleCopySelection();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://cpsel?selection=exampleSelection",
    });
  });

  test("sends the correct protocol invocation for general capture", async () => {
    await handleCapture();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection",
    });
  });

  test("sends the correct protocol invocation for capture with a given template", async () => {
    await handleCaptureWithTemplate("J")();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection&template=J",
    });
  });

  test("sends the correct protocol invocation for automatic capture without detected template", async () => {
    await handleCapture();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=exampleUrl&body=exampleSelection",
    });
  });

  test("sends the correct protocol invocation for automatic capture without detected template (JIRA URL)", async () => {
    mock.module("./activeTabData", () => ({
      getActiveTab: () => Promise.resolve({ id: 18 }),
      getSelectionFromTab: () => Promise.resolve("exampleSelection"),
      getUrlAndTitleFromTab: () => ({
        title: "exampleTitle",
        url: "https://jira.somewhere.com/browse/TM-3479",
      }),
    }));
    await handleCapture();
    expect(tabUpdateMock).toHaveBeenCalledWith(18, {
      url: "org-protocol://capture?title=exampleTitle&url=https%3A%2F%2Fjira.somewhere.com%2Fbrowse%2FTM-3479&body=exampleSelection",
    } as const);
  });
});
