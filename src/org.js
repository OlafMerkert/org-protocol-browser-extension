import { forEachObjIndexed } from "ramda";

export const orgProtocolUrlBuilder = name => parameters => {
  const url = new URL(`org-protocol://${name}`);
  forEachObjIndexed(
    (value, name) => url.searchParams.append(name, value),
    parameters
  );
  return url.toString();
};

export const capture = orgProtocolUrlBuilder("capture");
export const storeLink = orgProtocolUrlBuilder("store-link");
export const emacsBrowser = orgProtocolUrlBuilder("w3m");
export const copySelection = orgProtocolUrlBuilder("cpsel");
export const sendMail = orgProtocolUrlBuilder("email");
