
import { scaleFactor } from "./constants";


// ANCHOR 여기서 카붐의 전체 환경설정 진행
let config = {
  global: true,
  touchToMouse: false,
  canvas: document.getElementById("game"),
  scrollPos: [0, 0], // 화면 스크롤을 고정
  debug:true
};

export default config;

