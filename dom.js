export const DOM_TAG = {
  div: "div",
  button: "button",
  input: "input",
  h2: "h2",
};
// insertAdjacentElement(position, element)
export const POSITION = {
  beyond: "beforebegin",
  first: "afterbegin",
  last: "beforeend",
  after: "afterend",
};
console.log("hello");

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

export const appendDomObject = () => {
  
}
export const DOM = {
  $App: selectorNode("#app"),
};
