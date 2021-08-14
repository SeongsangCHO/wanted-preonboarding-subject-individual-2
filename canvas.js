import { selectorNode, DOM } from "./dom.js";
import { 초성 } from "./constant.js";
const drawState = {
  charData: [],
  intervalId: -1,
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

const imgOnLoad = async () => {
  const 중복제거 = [];
  for (let i = 0; i < drawState.charData.length; i++) {
    if (!중복제거.includes(drawState.charData[i])) {
      중복제거.push(drawState.charData[i]);
    }
  }
  console.log(중복제거);

  // const imgArray = Array(drawState.charData.length).fill(new Image());
  // imgArray.forEach((imgObj, idx) => {
  //   imgObj.onload = function () {
  //     await ctx.drawImage(imgObj, window.innerWidth / 5, 0);
  //     ctx.beginPath();
  //     ctx.stroke();
  //   };
  //   imgObj.src = `./assets/${drawState.charData[idx]}.svg`;
  // });
  return 중복제거;
};

export function draw(resultState) {
  if (!isVaildValue) {
    //출력할게 없으면
    return;
  }
  if (drawState.intervalId !== -1) {
    clearInterval(drawState.intervalId);
  }
  const imgArray = imgOnLoad();
  console.log(imgArray);

  createDrawCharArray(resultState);
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체
  // ctx.beginPath();
  // var img = new Image();

  // img.onload = function () {
  //   ctx.drawImage(img, window.innerWidth / 6, 0);
  //   ctx.beginPath();
  //   ctx.stroke();
  // };
  // img.src = "./assets/ㄴ.svg";
  // let [x, y] = [0, 0];
  // const animate = () => {
  //   canvasClear();
  //   ctx.drawImage(imgArray[0], window.innerWidth / 6, y);
  //   ctx.drawImage(imgArray[1], window.innerWidth / 5, y);
  //   ctx.drawImage(imgArray[2], window.innerWidth / 4, y);
  //   ctx.beginPath();
  //   ctx.stroke();
  //   x++;
  //   y++;
  // };
  // drawState.intervalId = setInterval(animate, 10);
}
