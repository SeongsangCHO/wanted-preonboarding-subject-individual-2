import { selectorNode, DOM, makeDomNode, DOM_TAG } from "./dom.js";
import { 초성 } from "./constant.js";

const makeImageNode = () => {
  const imageObject = {};
  초성.forEach((char) => {
    imageObject[char] = makeDomNode(DOM_TAG.img, "charImages");
    imageObject[char].src = `./assets/${char}.svg`;
  });
  return imageObject;
};

const drawState = {
  charData: [],
  intervalId: -1,
  imgPathValueArray: [],
  imgArray: [],
  randomLocX: [],
  randomLocY: [],
  randomSpeed: [],
};
const imgRoute = {
  ㄱ: "./assets/.svg",
};

const setDrawCharArrayState = (nextState) => {
  drawState.charData = [...nextState];
};
export const canvasClear = () => {
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체
  ctx.clearRect(0, 0, DOM.$Canvas.width, DOM.$Canvas.height);
};
const img = new Image();

img.addEventListener("load", () => {}, false);

const createDrawCharArray = (resultState) => {
  const charArray = [];
  for (let key in resultState) {
    for (let j = 0; j < resultState[key]; j++) {
      charArray.push(key);
    }
  }
  setDrawCharArrayState(charArray);
};

const isVaildValue = (resultState) => {
  let count = 0;
  for (let key in resultState) {
    count += resultState[key];
  }
  return count > 0 ? true : false;
};

const createImagePath = () => {
  for (let i = 0; i < drawState.charData.length; i++) {
    if (!drawState.imgPathValueArray.includes(drawState.charData[i])) {
      drawState.imgPathValueArray.push(drawState.charData[i]);
    }
  }
  for (let i = 0; i < drawState.imgPathValueArray.length; i++) {
    drawState.randomLocX.push(Math.random() * 750);
    drawState.randomLocY.push(Math.random() * 300);
    drawState.randomSpeed.push(Math.random() * 10);
  }
};

const initState = () => {
  drawState.charData = [];
  drawState.imgPathValueArray = [];
  drawState.imgArray = [];
  drawState.randomLocX = [];
  drawState.randomLocY = [];
  drawState.randomSpeed = [];
};
export async function draw(resultState) {
  initState();
  canvasClear();

  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체
  const imageObj = makeImageNode();
  if (!isVaildValue) {
    //출력할게 없으면
    return;
  }
  if (drawState.intervalId !== -1) {
    clearInterval(drawState.intervalId);
  }

  createDrawCharArray(resultState);
  createImagePath();
  let y = 0;

  const animate = () => {
    canvasClear();
    drawState.imgPathValueArray.forEach((char, i) => {
      ctx.drawImage(
        imageObj[char],
        drawState.randomLocX[i],
        800 + drawState.randomLocY[i] - y,
        25,
        25
      );
      ctx.beginPath();
      ctx.stroke();
    });

    y += 5;
    if (y === 650) {
      clearInterval(drawState.intervalId);
    }
  };
  drawState.intervalId = setInterval(animate, 10);
}
