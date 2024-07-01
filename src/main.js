import config from "./kaboomCtx";
import kaplay from 'kaplay';
import { dialogueData, scaleFactor } from "./constants";
import { displayDialogue, setCamScale } from "./utils";

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { greenField }  from './greenField.js';
import { 
  moveKeyRegacy,
  moveKey,
  leftButtonCreate,
  rightButtonCreate,
  upButtonCreate,
  downButtonCreate,
  moveAction,
  onTouchStartFn,
  touchEnd,
  onMouseDownFn,
  
 } from './moveController.js'
import  { slimePlayer,stopAnims}  from './player';

// const convexInit = import.meta.env.VITE_REACT_APP_CONVEX_URL;
// const client = new ConvexHttpClient('https://knowing-caiman-710.convex.cloud');

// client.query(api.ideas.get).then(console.log);

// 디버그를 할 수 있는 메서드
// debug.inspect =true

// 1. 화면에 사용할 스프라이트 이미지를 불러오기

// 애니메이션이 있는 스프라이트는 종이를 자르듯이 slice해서 사용
// import kaplay from "kaplay";



// // ANCHOR 여기서 카붐의 전체 환경설정 진행

kaplay(config);






// 맵 사용법
// loadSprite로 png를 받는다
loadSprite("map", "./map.png");

loadSprite("left", "./arrow_left_light.png");
loadSprite("right", "./arrow_right_light.png");
loadSprite("up", "./arrow_up_light.png");
loadSprite("down", "./arrow_down_light.png");



document.querySelector('button').addEventListener('click', function() {
  // Existing code unchanged.

  window.onload = function() {
  var context = new AudioContext();
  // Setup all nodes
  // ...
  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
}
loadSound("music", "./bgm.mp3").then((music) =>{
  play("music");
});
});



// 전역변수
const keyDown = {
  left:false,
  right:false,
  up:false,
  down:false
  };
let player = slimePlayer();


scene("main", async () => {

  setBackground(Color.fromHex("#5ba675"));

  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;
  const map = add([sprite("map"), pos(0), scale(scaleFactor)]);
  


   
// ui
  const leftButton = leftButtonCreate();
  const rightButton = rightButtonCreate();
  const upButton = upButtonCreate();
  const downButton =downButtonCreate();

  // move setting  
// 1. 터치
moveAction(keyDown,player);
onTouchStartFn(keyDown,player,leftButton,rightButton,upButton,downButton);
touchEnd(keyDown,player,leftButton,rightButton,upButton,downButton);

// 2. 마우스
onMouseDownFn(player);
onMouseRelease(() => {
    stopAnims(player);
  });

// 3.키보드
  moveKey(keyDown,player);
onKeyRelease(() => {
    stopAnims(player);
  });



  // map
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          area({
            shape: new Rect(vec2(0), boundary.width, boundary.height),
          }),
          body({ isStatic: true }),
          pos(boundary.x, boundary.y),
          boundary.name,
        ]);


        if (boundary.name) {

      
          player.onCollide(boundary.name, () => {
            if(boundary.name === 'exit'){
              player.isInDialogue = false;
               go("field",{level:0,score:0});
            }
            else{
              player.isInDialogue = true;
              displayDialogue(
                dialogueData[boundary.name],
                () => (player.isInDialogue = false)
              );
            }

           
          });
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          console.log(player.pos)
          add(player);
          continue;
        }
      }
    }
  }

  setCamScale();

  onResize(() => {
    setCamScale();
  });

  onUpdate(() => {
    camPos(player.worldPos().x, player.worldPos().y - 100);
  });





 
 

  
});

greenField();

go("main", 
// {
//   level: (levelIndex + 1) % maps.length,
//   score: scoreLabel.value
// }
);


export default player;