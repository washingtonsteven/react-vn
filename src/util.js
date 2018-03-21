const variableRegEx = new RegExp(/#{(\S+)}/g);
export const replaceVariables = (content = "", customData = {}) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
};

const shortcodeRegEx = new RegExp(/\[(.*?)?\](?:(.+?)?\[\/(.*?)\])?/);
export const processShortcodes = (content = "") => {
  const processed = content.replace(
    shortcodeRegEx,
    (match, open, children, close) => {
      if (open === close) {
        return `<span class="${open}">${children
          .split("")
          .map(l => `<span>${l}</span>`)
          .join("")}</span>`;
      }
    }
  );

  return processed;
};

export const EXCERPT_LENGTH = 40;
export const excerpt = str => {
  return str && str.substring
    ? str.substring(0, EXCERPT_LENGTH) +
        (str.length > EXCERPT_LENGTH ? "\u2026" : "")
    : str;
};

export const noOp = () => {};

export const generateId = nodes =>
  nodes.length
    ? String(
        Math.max.apply(Math, nodes.map(n => String(+n.id >= 0 ? +n.id : -1))) +
          1
      )
    : 0;

const s = () => Math.floor((1 + Math.random()) * 0x10000).toString(16);
export const uuid = () => `${s()}-${s()}-${s()}-${s()}`;

const DEFAULT = "default";
const INPUT = "input";
const INVENTORY = "inventory";
export const NodeLinkTypes = { DEFAULT, INPUT, INVENTORY };
