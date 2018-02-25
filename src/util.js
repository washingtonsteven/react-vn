const variableRegEx = new RegExp(/#{(\S+)}/);
export const replaceVariables = (content, customData) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
}

export const EXCERPT_LENGTH = 15;
export const excerpt = str => {
  return str.substring(0, EXCERPT_LENGTH) + (str.length > EXCERPT_LENGTH ? '\u2026' : '');
}

export const nullFunc = () => {}

export const generateId = () => `_${Math.random().toString(36).substr(2,9)}`;