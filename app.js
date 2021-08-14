import { countingConsonant } from "./countingConsonant.js";
import { draw } from "./canvas.js";

import {
  DOM,
  DOM_TAG,
  POSITION,
  makeDomNode,
  appendNode,
  selectorNode,
} from "./dom.js";

import { 초성 } from "./constant.js";

const inputState = {
  value: "",
};
const setInputState = (next) => {
  inputState.value = next;
};
const resultState = {};
const setResultState = (next) => {
  Object.assign(resultState, next);
};
const makeLayOut = () => {
  DOM.$Wrapper = makeDomNode(DOM_TAG.div, "wrapper");
  appendNode(POSITION.first, DOM.$App, DOM.$Wrapper);
  DOM.$SearchWrapper = makeDomNode(DOM_TAG.div, "search-wrapper");
  appendNode(POSITION.first, DOM.$Wrapper, DOM.$SearchWrapper);

  DOM.$Input = makeDomNode(DOM_TAG.input, "input");
  DOM.$Input.setAttribute("placeholder", "초성 갯수 셀 텍스트 입력");
  appendNode(POSITION.first, DOM.$SearchWrapper, DOM.$Input);

  DOM.$Button = makeDomNode(DOM_TAG.button, "button");
  DOM.$Button.innerText = "검색";

  appendNode(POSITION.last, DOM.$SearchWrapper, DOM.$Button);

  DOM.$Title = makeDomNode(DOM_TAG.h2, "title");
  DOM.$Title.innerText = "Mr.Camel 개인과제";
  appendNode(POSITION.first, DOM.$Wrapper, DOM.$Title);

  DOM.$Canvas = makeDomNode(DOM_TAG.canvas, "canvas");
  DOM.$Canvas.setAttribute("width", "800px");
  DOM.$Canvas.setAttribute("height", "800px");
  appendNode(POSITION.beyond, DOM.$App, DOM.$Canvas);
};

const addCanvasTransition = () => {
  DOM.$Canvas.classList.add("on");
};
const removeCanvasTransition = () => {
  DOM.$Canvas.classList.remove("on");
};

const makeResultItems = () => {
  if (selectorNode(".result-list")) DOM.$ResultList.remove();
  DOM.$ResultList = makeDomNode(DOM_TAG.ul, "result-list");
  appendNode(POSITION.first, DOM.$App, DOM.$ResultList);
  초성.forEach((char) => {
    const node = makeDomNode(DOM_TAG.li, "item");
    node.innerText = `${char} : ${resultState[char]}`;
    appendNode(POSITION.last, DOM.$ResultList, node);
  });
};

const handleSearch = (value) => {
  setInputState(value);
  const result = countingConsonant(inputState.value);
  setResultState(result);
};

const bindEvent = () => {
  DOM.$Input.addEventListener("keypress", (e) => {
    setInputState(e.target.value);
    if (e.key === "Enter") {
      handleSearch(e.target.value);
      draw(resultState);
      makeResultItems();
    }
  });
  DOM.$Button.addEventListener("click", () => {
    handleSearch(inputState.value);
    draw(resultState);
    makeResultItems();
  });
};

const init = () => {
  makeLayOut();
  bindEvent();
  DOM.$Input.focus();
};

init();
