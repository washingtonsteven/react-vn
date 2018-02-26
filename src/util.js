const variableRegEx = new RegExp(/#{(\S+)}/);
export const replaceVariables = (content, customData) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
}

export const EXCERPT_LENGTH = 40;
export const excerpt = str => {
  return str && str.substring ? str.substring(0, EXCERPT_LENGTH) + (str.length > EXCERPT_LENGTH ? '\u2026' : '') : str;
}

export const nullFunc = () => {}

export const generateId = nodes => String(Math.max.apply(Math, nodes.map(n => String(+n.id >= 0 ? +n.id : -1))) + 1);