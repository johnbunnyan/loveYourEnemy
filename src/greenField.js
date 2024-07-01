import config from "./kaboomCtx";
import kaplay from 'kaplay';
import { dialogueData, scaleFactor } from "./constants";
import { displayDialogue, setCamScale } from "./utils";
import { 
    moveKeyRegacy,
    moveKey,
    // leftButtonCreate,
    // rightButtonCreate,
    // upButtonCreate,
    // downButtonCreate,
    moveAction,
    onTouchStartFn,
    touchEnd,
    onMouseDownFn,
    
   } from './moveController.js'
  import  { slimePlayer,stopAnims}  from './player';



 export function greenField(){

    loadSprite("greenMap", "./green/green.png");
    loadSprite("spritesheet", "./spritesheet.png", {
        sliceX: 39,
        sliceY: 33.6,
        anims: {
          "idle-down": 936,
          "walk-down": { from: 936, to: 937, loop: true, speed: 8 },
          "idle-side": 938,
          "walk-side": { from: 938, to: 939, loop: true, speed: 8 },
          "idle-up": 975,
          "walk-up": { from: 975, to: 976, loop: true, speed: 8 },
        },
      });


   


// 전역변수
const keyDown = {
    left:false,
    right:false,
    up:false,
    down:false
    };
  let player = slimePlayer();




    scene("field", async (level, score) => {
        
        onLoading((progress) => {
            // Black background
            drawRect({
                width: width(),
                height: height(),
                color: rgb(0, 0, 0),
            });
        
            // A pie representing current load progress
            drawCircle({
                pos: center(),
                radius: 32,
                end: map(progress, 0, 1, 0, 360),
            });
        
            drawText({
                text: "loading" + ".".repeat(wave(1, 4, time() * 12)),
                font: "monospace",
                size: 24,
                anchor: "center",
                pos: center().add(0, 70),
            });
        });
        setBackground(Color.fromHex("#f28b30"));
        
    
        


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





        const mapData = await (await fetch("./green/green.json")).json();
        const layers = mapData.layers;
        const map = add([sprite("greenMap"), pos(0), scale(scaleFactor)]);

        // layers(['bg','obj','ui'],'obj');

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
                       go("main");
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
        

        // drawText({
        //     text: "oh hi",
        //     size: 100,
        //     font: "sans-serif",
        //     width: 120,
        //     pos: vec2(100, 150),
        //     color: rgb(0, 0, 255),
        // })



  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }



  onKeyRelease(() => {
    stopAnims();
  });

       // 해당 키 방향대로 player를 이동시켜주는 기능
  onKeyDown((key) => {

    //isKeyDown으로 키보드의 입력 정보를 받음
    const keyMap = [
      isKeyDown("d"),
      isKeyDown("a"),
      isKeyDown("w"),
      isKeyDown("s"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }
    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    // //각 입력별 분기에 따라 player 처리
    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    }
  });


    

      });
 }





  