import { countingConsonant } from "./countingConsonant.js";
import { draw, canvasClear } from "./canvas.js";

import {
  DOM,
  DOM_TAG,
  POSITION,
  makeDomNode,
  appendNode,
  selectorNode,
  appendDomObject,
} from "./dom.js";
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
  DOM.$InputWrapper = makeDomNode(DOM_TAG.div, "wrapper");
  appendNode(POSITION.first, DOM.$App, DOM.$InputWrapper);

  DOM.$Input = makeDomNode(DOM_TAG.input, "input");
  DOM.$Input.setAttribute("placeholder", "초성 갯수 셀 텍스트 입력");
  appendNode(POSITION.first, DOM.$InputWrapper, DOM.$Input);

  DOM.$Button = makeDomNode(DOM_TAG.button, "button");
  DOM.$Button.innerText = "검색";

  appendNode(POSITION.last, DOM.$InputWrapper, DOM.$Button);

  DOM.$Title = makeDomNode(DOM_TAG.h2, "title");
  DOM.$Title.innerText = "Mr.Camel 개인과제";
  appendNode(POSITION.first, DOM.$App, DOM.$Title);

  DOM.$Canvas = makeDomNode(DOM_TAG.canvas, "canvas");
  appendNode(POSITION.beyond, DOM.$App, DOM.$Canvas);
};
const handleSearch = (value) => {
  setInputState(value);
  const result = countingConsonant(inputState.value);
  setResultState(result);
};

const bindEvent = () => {
  DOM.$Input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);

      draw(resultState); //-> 입력글자에 따른 이미지 출력은 되나 애니메이션 적용을 못하겠다..
    }
  });
  DOM.$Button.addEventListener("click", (e) => {
    handleSearch(e.target.value);
  });
};

const init = () => {
  makeLayOut();
  bindEvent();
  DOM.$Input.focus();
};

init();
