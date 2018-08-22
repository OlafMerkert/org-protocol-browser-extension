const TEMPLATE_KEYS = {
  PULL_REQUEST: "R",
};

export const detectCaptureTemplate = parameters => {
  const tfsPRPattern = /tfs.*pullrequest/;
  if (tfsPRPattern.test(parameters.url)) {
    return { ...parameters, template: TEMPLATE_KEYS.PULL_REQUEST };
  }
  return parameters;
};
