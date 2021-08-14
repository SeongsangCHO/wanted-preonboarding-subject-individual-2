import { countingConsonant } from "./countingConsonant.js";
import {
  DOM,
  DOM_TAG,
  POSITION,
  makeDomNode,
  appendNode,
  selectorNode,
  appendDomObject,
} from "./dom.js";

const makeLayOut = () => {
  DOM.$InputWrapper = makeDomNode(DOM_TAG.div, "wrapper");
  appendNode(POSITION.first, DOM.$App, DOM.$InputWrapper);

  DOM.$Input = makeDomNode(DOM_TAG.input, "input");
  appendNode(POSITION.first, DOM.$InputWrapper, DOM.$Input);

  DOM.$Button = makeDomNode(DOM_TAG.button, "button");
  DOM.$Button.innerText = "검색";
  appendNode(POSITION.last, DOM.$InputWrapper, DOM.$Button);

  DOM.$Title = makeDomNode(DOM_TAG.h2, "title");
  DOM.$Title.innerText = "초성 갯수를 검색해보세요";
  appendNode(POSITION.first, DOM.$App, DOM.$Title);
};

const bindEvent = () => {
  DOM.$Input.addEventListener("focus", () => {
    console.log("focus");
  });
};

const init = () => {
  makeLayOut();
  bindEvent();
};

init();
console.log(DOM);
