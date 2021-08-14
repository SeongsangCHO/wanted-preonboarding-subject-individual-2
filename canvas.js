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

const imgOnLoad = async () => {
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체
  const 중복제거 = [];
  for (let i = 0; i < drawState.charData.length; i++) {
    if (!중복제거.includes(drawState.charData[i])) {
      중복제거.push(drawState.charData[i]);
    }
  }

  const 이미지로드 = (idx) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = `./assets/${중복제거[idx]}.svg`;
    });
  };
  const getImage = (idx) => {
    return 이미지로드(idx).then((img) => {
      ctx.drawImage(img, 0 + idx * 100, 0);
    });
  };
  중복제거.forEach((_, idx) => {
    getImage(idx);
  });
};

export function draw(resultState) {
  canvasClear();
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체

  if (!isVaildValue) {
    //출력할게 없으면
    return;
  }
  if (drawState.intervalId !== -1) {
    clearInterval(drawState.intervalId);
  }
  imgOnLoad();
  console.log(ctx);

  createDrawCharArray(resultState);
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
