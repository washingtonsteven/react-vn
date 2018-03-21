import React from "react";

const variableRegEx = new RegExp(/#{(\S+)}/g);
export const replaceVariables = (content = "", customData = {}) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
};

const shortcodeRegEx = new RegExp(/\[(.*?)?\](?:(.+?)?\[\/(.*?)\])?/g);
export const processShortcodes = (content = "") => {
  let currentTag = "";
  const processed = content.split(shortcodeRegEx).reduce((acc, v, i) => {
    if (i % 4 === 0 && v) acc.push(<span key={i}>{v}</span>);
    else if (i % 4 === 2 && currentTag) {
      acc.push(
        <span className={currentTag} key={i}>
          {v.split("").map((l, j) => <span key={`${i}.${j}`}>{l}</span>)}
        </span>
      );
      currentTag = "";
    } else if (i % 4 === 1) {
      currentTag = v;
    }
    return acc;
  }, []);

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
