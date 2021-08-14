export const DOM_TAG = {
  div: "div",
  button: "button",
  input: "input",
  h2: "h2",
  canvas: "canvas",
  img: "img",
  ul: "ul",
  li: "li",
};
export const POSITION = {
  beyond: "beforebegin",
  first: "afterbegin",
  last: "beforeend",
  after: "afterend",
};

export const makeDomNode = (domTag, className) => {
  const newNode = document.createElement(domTag);
  newNode.className = className;
  return newNode;
};

export const appendNode = (pos, target, node) => {
  target.insertAdjacentElement(pos, node);
};

export const selectorNode = (identifier) => {
  return document.querySelector(identifier);
};
export const selectorAllNode = (identifier) => {
  return document.querySelectorAll(identifier);
};

export const appendDomObject = () => {};
export const DOM = {
  $App: selectorNode("#app"),
};
