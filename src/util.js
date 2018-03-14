const variableRegEx = new RegExp(/#{(\S+)}/g);
export const replaceVariables = (content = "", customData = {}) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
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
  String(
    Math.max.apply(Math, nodes.map(n => String(+n.id >= 0 ? +n.id : -1))) + 1
  );

const s = () => Math.floor((1 + Math.random()) * 0x10000).toString(16);
export const uuid = () => `${s()}-${s()}-${s()}-${s()}`;

const DEFAULT = "default";
const INPUT = "input";
const INVENTORY = "inventory";
export const NodeLinkTypes = { DEFAULT, INPUT, INVENTORY };
