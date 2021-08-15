import { 초성, 중성, 종성, 완성글자정규식, isKoreanReg } from "./constant.js";
// const input = "사과1호랑이,고니 수박BT닭";
const input = "ㅆㅅㅁㅇㅁㄴㅇㅂㅈㅇ가나다라";

const 초성인덱스 = (code) => {
  return Math.floor(code / 588);
};

const 중성인덱스 = (code) => {
  return ((code - 종성인덱스(code)) / 28) % 21;
};

const 종성인덱스 = (code) => {
  return code % 28;
};

export const countingConsonant = (inputValue) => {
  const 초성dic = {
    ㄲ: 0,
    ㄸ: 0,
    ㅃ: 0,
    ㅆ: 0,
    ㅉ: 0,
    ㄱ: 0,
    ㄴ: 0,
    ㄷ: 0,
    ㄹ: 0,
    ㅁ: 0,
    ㅂ: 0,
    ㅅ: 0,
    ㅇ: 0,
    ㅈ: 0,
    ㅊ: 0,
    ㅋ: 0,
    ㅌ: 0,
    ㅍ: 0,
    ㅎ: 0,
  };
  const filtered = inputValue
    .split("")
    .filter((item) => isKoreanReg.test(item));

  const 완성글자만 = filtered.filter((item) => 완성글자정규식.test(item));
  완성글자만.forEach((char) => {
    const code = char.charCodeAt(0) - 44032;
    const 초성인덱스값 = 초성인덱스(code);
    초성dic[초성[초성인덱스값]] += 1;
  });
  return 초성dic;
};
// console.log(solve(filtered))