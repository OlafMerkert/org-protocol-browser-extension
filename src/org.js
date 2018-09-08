import { join, map, pipe, toPairs } from "ramda";

export const orgProtocolUrlBuilder = name => {
  const baseUrl = `org-protocol://${name}`;
  const prependBaseUrl = parameters => (parameters ? `${baseUrl}?${parameters}` : baseUrl);
  const encodeParameter = ([name, value]) => `${name}=${encodeURIComponent(value)}`;

  return pipe(
    toPairs,
    map(encodeParameter),
    join("&"),
    prependBaseUrl
  );
};

const openUrl = url => (window.browser || chrome).tabs.update({ url });

const openOrgProtocolUrl = name =>
  pipe(
    orgProtocolUrlBuilder(name),
    openUrl
  );

export const capture = openOrgProtocolUrl("capture");
export const storeLink = openOrgProtocolUrl("store-link");
export const openInEmacsBrowser = openOrgProtocolUrl("textbrowser");
export const copySelection = openOrgProtocolUrl("cpsel");
export const sendMail = openOrgProtocolUrl("email");
