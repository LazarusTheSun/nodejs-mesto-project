const protocolRegExp = /^http[s]{0,1}:\/{2}/;
const subdomainRegExp = /(www\.){0,1}/;
const sdlRegExp = /([a-z\d-]+\.)+/;
const tldRegExp = /[a-z]{2,}/;
const pathRegExp = /(\/[\w\-.~:/?#[\]@!$&'()*+,;=]+)*/;

export const avatarRegExp = new RegExp(
  protocolRegExp.source +
  subdomainRegExp.source +
  sdlRegExp.source +
  tldRegExp.source +
  pathRegExp.source);