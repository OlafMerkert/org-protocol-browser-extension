import { describe, expect, test } from "bun:test";
import { orgProtocolUrlBuilder } from "./org";

describe("For invoking org-protocol urls", () => {
  test("builds the correct URL", () => {
    const actual = orgProtocolUrlBuilder("capture")({
      url: "http://www.sl2z.de",
    });
    expect(actual).toBe("org-protocol://capture?url=http%3A%2F%2Fwww.sl2z.de");
  });

  test("can add multiple parameters", () => {
    const actual = orgProtocolUrlBuilder("store-link")({
      title: "Hello",
      body: "Indeed",
    });
    expect(actual).toBe("org-protocol://store-link?title=Hello&body=Indeed");
  });

  test("encodes space with a percent symbol", () => {
    const actual = orgProtocolUrlBuilder("store-link")({
      title: "Hello World",
    });
    expect(actual).toBe("org-protocol://store-link?title=Hello%20World");
  });
});
