import { selectorNode, DOM, makeDomNode, DOM_TAG } from "./dom.js";
import { 초성 } from "./constant.js";

const makeImageNode = () => {
  const imageObject = {};
  초성.forEach((char) => {
    imageObject[char] = makeDomNode(DOM_TAG.img, "charImages");
    imageObject[char].src = `./assets/${char}.svg`;
  });
  console.log(imageObject);
  return imageObject;
};

const drawState = {
  charData: [],
  intervalId: -1,
  imgPathValueArray: [],
  imgArray: [],
  randomLocX: [],
  randomLocY: [],
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

  console.log("clear ctx");
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
    drawState.randomLocX.push(Math.random() * 500);
    drawState.randomLocY.push(Math.random() * 100);
  }
  console.log(window.innerWidth, window.innerHeight);
};

export async function draw(resultState) {
  drawState.charData = [];
  drawState.imgPathValueArray = [];
  drawState.imgArray = [];
  drawState.randomLocX = [];
  drawState.randomLocY = [];
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
  let x = 0;
  console.log(drawState.randomLocY);

  const animate = () => {
    canvasClear();
    drawState.imgPathValueArray.forEach((char, i) => {
      ctx.drawImage(
        imageObj[char],
        drawState.randomLocX[i],
        500 + drawState.randomLocY[i] - y,
        25,
        25
      );
      ctx.beginPath();
      ctx.stroke();
    });
    x++;
    y++;
  };
  // animate();
  drawState.intervalId = setInterval(animate, 10);
}
