import { selectorNode, DOM } from "./dom.js";
import { 초성 } from "./constant.js";
const drawState = {
  charData: [],
  intervalId: -1,
  imgPathValueArray: [],
  imgArray: [],
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
};

const 이미지로드 = (idx) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = `./assets/${drawState.imgPathValueArray[idx]}.svg`;
  });
};

const paintImages = (idx) => {
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체
  return 이미지로드(idx).then((img) => {
    ctx.drawImage(img, 0 + idx * 25, 0);
    drawState.imgArray.push(img); //[img(ㄱ.svg)]
    console.log(drawState.imgArray);
  });
};

const drawImages = async () => {
  //[ㄱ,ㄴ,ㄷ]
  const data = await drawState.imgPathValueArray.map(async (_, idx) => {
    await paintImages(idx);
    return drawState.imgArray;
  });
  // data == [img(ㄱ.svg), img(ㄴ.svg),img(ㄷ.svg)]
  return data[0];
};

export function draw(resultState) {
  drawState.charData = [];
  drawState.imgPathValueArray = [];
  drawState.imgArray = [];
  canvasClear();
  var ctx = selectorNode("canvas").getContext("2d"); //그리기 객체

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
  // console.log(drawImages());

  drawImages().then(() => {
    const animate = () => {
      canvasClear();
      for (let i = 0; i < drawState.imgArray.length; i++) {
        ctx.drawImage(drawState.imgArray[i], i * 25, y);
        ctx.beginPath();
        ctx.stroke();
      }
      x++;
      y++;
    };
    drawState.intervalId = setInterval(animate, 10);
  });

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
}
