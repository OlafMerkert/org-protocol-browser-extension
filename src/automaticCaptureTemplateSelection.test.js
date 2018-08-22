import { detectCaptureTemplate } from "./automaticCaptureTemplateSelection";

describe("The automatic selection of a capture template", () => {
  ["https://github.com/ramda/ramda/issues/736", "https://www.sl2z.de"].forEach(normalUrl => {
    it("does not select a template for normal urls", () => {
      const exampleParameters = {
        title: "exampleTitle",
        body: "exampleSelection",
        url: normalUrl,
      };

      const actualParameters = detectCaptureTemplate(exampleParameters);
      expect(actualParameters.template).not.toBeDefined();
    });
  });

  it("detects a TFS pull request based on the URL", () => {
    const exampleParameters = {
      title: "exampleTitle",
      url:
        "http://someserver:8080/tfs/DefaultCollection/someProject/someTeam/_git/someRepo/pullrequest/2134#_a=overview",
      body: "exampleSelection",
    };

    const actualParameters = detectCaptureTemplate(exampleParameters);
    expect(actualParameters).toEqual({ ...exampleParameters, template: "R" });
  });

  it("detects a JIRA issue page base on the URL", () => {
    const exampleParameters = {
      title: "exampleTitle",
      url: "https://jira.somewhere.com/browse/TM-3479",
      body: "exampleSelection",
    };

    const actualParameters = detectCaptureTemplate(exampleParameters);
    expect(actualParameters).toEqual({ ...exampleParameters, template: "J" });
  });

  it("detects a JIRA issue page base on the URL", () => {
    const exampleParameters = {
      title: "exampleTitle",
      url:
        "https://jira.somewhere.com/secure/RapidBoard.jspa?rapidView=100&view=detail&selectedIssue=TM-3479",
      body: "exampleSelection",
    };

    const actualParameters = detectCaptureTemplate(exampleParameters);
    expect(actualParameters).toEqual({
      title: "JIRA TM-3479",
      url: "https://jira.somewhere.com/browse/TM-3479",
      body: "exampleSelection",
      template: "J",
    });
  });
});
