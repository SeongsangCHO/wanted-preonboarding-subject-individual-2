const 초성 = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const 중성 = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
const 종성 = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
// const input = "사과1호랑이,고니 수박BT닭";
const input = "ㅆㅅㅁㅇㅁㄴㅇㅂㅈㅇ가나다라";

const isKoreanReg = /^[가-힣ㄱ-ㅎ]+$/;
const 자음정규식 = /^[ㄱ-ㅎ]+$/;
const 완성글자정규식 = /^[가-힣]+$/;
const filtered = input.split("").filter((item) => isKoreanReg.test(item));

const 초성dic = {
  "ㄱ": 0,
  "ㄴ": 0,
  "ㄷ": 0,
  "ㄹ": 0,
  "ㅁ": 0,
  "ㅂ": 0,
  "ㅅ": 0,
  "ㅇ": 0,
  "ㅈ": 0,
  "ㅊ": 0,
  "ㅋ": 0,
  "ㅌ": 0,
  "ㅍ": 0,
  "ㅎ": 0,
}

const 초성인덱스 = (code) => {
  return Math.floor(code / 588);
}

const 중성인덱스 = (code) => {
  return ((code - 종성인덱스(code)) / 28) % 21;
}

const 종성인덱스 = (code) => {
  return code % 28;
}

export const countingConsonant = (filtered) => {
  const 완성글자만 = filtered.filter((item) => 완성글자정규식.test(item));
  완성글자만.forEach((char) => {
    const code = char.charCodeAt(0) - 44032;
    const 초성인덱스값 = 초성인덱스(code);
    초성dic[초성[초성인덱스값]] += 1;
  })
  return 초성dic;
}
// console.log(solve(filtered))