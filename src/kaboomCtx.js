import kaplay from "kaplay";
import { scaleFactor } from "./constants";


// ANCHOR 여기서 카붐의 전체 환경설정 진행
export const k = kaplay({
  global: false,
  touchToMouse: false,
  canvas: document.getElementById("game"),
  debug: false, // set to false once ready for production,
  scrollPos: [0, 0], // 화면 스크롤을 고정
});
