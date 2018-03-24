import React from "react"; // needed for `processShortcodes`, below

export const modalNode = document.getElementById("modal-root");
export const styleNode = document.getElementById("style-node");

/*
 * replaceVariables(content, customData)
 * 
 * @param content:String - the content with variables to replace
 * @param customData:Object - the object holding the data to replace
 * @return String - `content` with variable regions replaced with data in `customData`
 * 
 * `content` is a normal string, marked with regions with a variable name, such as "#{name}""
 * 
 * This function will find all regions that are marked with a variable name. e.g. in "The quick brown
 * #{animal} jumped over the big lazy #{animal2}", `animal` and `animal2` are variable names.
 * 
 * After getting the variable names, the function will replace the `content` string with data in `customData`. 
 * If the variable doesn't exist in `customData`, the string is left alone. e.g., given the sentence above,
 * and a custom data like `{animal:"fox"}`, the result would be: "The quick brown fox jumped over the big
 * lazy #{animal2}"
 * 
 */
const variableRegEx = new RegExp(/#{(\S+)}/g);
export const replaceVariables = (content = "", customData = {}) => {
  return content.replace(variableRegEx, (match, varName) => {
    return customData[varName] || match;
  });
};

/*
 * processShortcodes(content)
 * 
 * @param content:String - the content with shortcodes to process
 * @return ReactNode - a `<span>` React node containing the result of the shortcode, explained below:
 * 
 * This processes shortcode regions, marked by #[regionname]...content...[/], replacing the regions with
 * a `<span>` element with `className` set to `regionname`.
 * 
 * Additionally, this will also take `content` and split it on each indifidual character, wrapping them 
 * in `<span>` tags (to allow for individual letter animations).
 * 
 * e.g. If `content` is "I want to [rainbow]sparkle![/]", the result will be:
 *   <span className="rainbow">
 *     <span>s</span>
 *     <span>p</span>
 *     <span>a</span>
 *     <span>r</span>
 *     <span>k</span>
 *     <span>l</span>
 *     <span>e</span>
 *     <span>!</span>
 *   </span>
 * 
 * NB: This function returns a ReactNode, not a string.
 *
 */
const shortcodeRegEx = new RegExp(/#\[(.*?)?\](?:(.+?)?\[\/(.*?)\])?/g);
export const processShortcodes = (content = "") => {
  let currentTag = "";
  const processed = content.split(shortcodeRegEx).reduce((acc, v, i) => {
    if (!v) return acc;
    if (i % 4 === 0 && v) acc.push(<span key={i}>{v}</span>);
    else if (i % 4 === 2 && currentTag) {
      const splitContent = v
        .split("")
        .map((l, j) => <span key={`${i}.${j}`}>{l}</span>);
      if (currentTag.indexOf("link") === 0) {
        const splitTag = currentTag.split(" ");
        const tag = splitTag.slice(0, splitTag.length - 1).join(" ");
        const href = splitTag[splitTag.length - 1];
        acc.push(
          <a
            href={href}
            className={`link ${tag}`}
            key={i}
            target="_blank"
            rel="noreferrer noopener"
          >
            {splitContent}
          </a>
        );
      } else {
        acc.push(
          <span className={currentTag} key={i}>
            {splitContent}
          </span>
        );
      }
      currentTag = "";
    } else if (i % 4 === 1) {
      currentTag = v;
    }
    return acc;
  }, []);

  return processed;
};

/*
 * excerpt(str)
 * 
 * @param str:String - the string to be excerpted
 * @return String - the excerpted string
 * 
 * This function will trim `str` to the desired length, set as `EXCERPT_LENGTH`.
 * If str is longer than `EXCERPT_LENGTH`, ellipses (&hellip;) are added to the returned string.
 */
export const EXCERPT_LENGTH = 45;
export const excerpt = str => {
  return str && str.substring
    ? str.substring(0, EXCERPT_LENGTH) +
        (str.length > EXCERPT_LENGTH ? "\u2026" : "")
    : str;
};

// Does nothing, duh.
export const noOp = () => {};

/*
 * generateId(nodes)
 * 
 * @param nodes:Array - an array of objects where each object has a prop `id` that is numeric
 * @return String - The next id in sequence. 
 * 
 * `generateId` will generate the next id in sequence. 
 * If the passed array already has 3 elements, each with `id` set to 0, 1, and 2
 * generateId will return '3'
 * 
 * If you need a non-sequential pseudo-uuid, look at `uuid()`
 * 
 */
export const generateId = nodes =>
  nodes.length
    ? String(
        Math.max.apply(Math, nodes.map(n => String(+n.id >= 0 ? +n.id : -1))) +
          1
      )
    : 0;

/*
 * uuid()
 * 
 * @return String - a unique identifier, but doesn't quite follow actual UUID rules. 
 * 
 * This doesn't return an actual UUID according to whatever spec there is, but this is good enough.
 */
const s = () => Math.floor((1 + Math.random()) * 0x10000).toString(16);
export const uuid = () => `${s()}-${s()}-${s()}-${s()}`;

// NodeLinkTypes
const DEFAULT = "default";
const INPUT = "input";
const INVENTORY = "inventory";
export const NodeLinkTypes = { DEFAULT, INPUT, INVENTORY };

const camelToDash = str => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const toCSS = styleObj => {
  return Object.entries(styleObj).reduce((acc, v) => {
    return `${acc} ${camelToDash(v[0])}: ${v[1].replace("url", "")};`;
  }, "");
};
