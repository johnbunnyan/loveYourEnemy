import config from "./kaboomCtx.js";
import kaplay from 'kaplay';
import { dialogueData, scaleFactor } from "./constants.js";
import { displayDialogue, setCamScale } from "./utils.js";


import { greenField }  from './greenField.js';
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
  createButton,
  
 } from './moveController.js'
import  { 
  slimePlayer,
  stopAnims,
  enemyPlayer,

}  from './player.js';

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



scene("main", async ({level,score}) => {
  const player = slimePlayer();

 


  setBackground(Color.fromHex("#5ba675"));

  


   
// ui
const {leftButton,rightButton,downButton,upButton} = createButton();


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

  let layers;
  let map;
  let enemy;

  if(level === 0){
    loadSprite("map", "./map.png");
    const mapData = await (await fetch("./map.json")).json();
    layers = mapData.layers;
     map = add([sprite("map"), pos(0),scale(scaleFactor)]);

  }
  else if(level === 1){
    loadSprite("greenMap", "./green/green.png");
    const GreenMapData = await (await fetch("./green/green.json")).json();
    layers  = GreenMapData.layers;
    map = add([sprite("greenMap"), pos(0), scale(scaleFactor)]);

     enemy = enemyPlayer();
     enemy.play("idle-down");
     enemy.pos = vec2(
     1000,500
    );
  
add(enemy);


// // Function to move player in a random direction
// function movePlayerRandomly() {
//   const directions = [
//       vec2(1, 0),  // Right
//       vec2(-1, 0), // Left
//       vec2(0, 1),  // Down
//       vec2(0, -1), // Up
//   ];

//   const randomDirection = directions[Math.floor(Math.random() * directions.length)];

  
//   return enemy.direction = randomDirection;
// }
// // Set interval to move player randomly every second
// loop(1, () => {
  
//   let way = movePlayerRandomly();
// // Update player's position
// onUpdate(() => {
//   enemy.move(way);
// });

// });



    const moveRandom = (dir)=>{
      console.log(dir)
      console.log(enemy.direction)
      if(dir == 0){
        
        onUpdate("enemy", (enemy)=>{
          enemy.direction = "right";
          enemy.play("walk-side");
          enemy.move(120,0)
          wait(2,stopAnims(enemy));  
        })

        // onUpdate("enemy", (enemy)=>{
        //    enemy.play("walk-side");
    
        // })
      }
      else if(dir == 1){
        onUpdate("enemy", (enemy)=>{
          enemy.play("walk-side");
   
        })
    
        onUpdate("enemy", (enemy)=>{
         
          enemy.direction = "left";
           enemy.move(-120,0)
           wait(2,  stopAnims(enemy));
     
        })
      }
      else if(dir == 2){
        onUpdate("enemy", (enemy)=>{
          enemy.play("walk-up");
     
        })
    
        onUpdate("enemy", (enemy)=>{
          enemy.direction = "up";
           enemy.move(0,-120)
           wait(2,  stopAnims(enemy));
     
        })
      }
      else if(dir == 3){
        onUpdate("enemy", (enemy)=>{
      enemy.play("walk-down");
     
        })
    
        onUpdate("enemy", (enemy)=>{
          enemy.direction = "down";
           enemy.move(0,120)
           wait(2,  stopAnims(enemy));
     
        })
      }
   
  
    
    }
    
    // loop(3, ()=>{
    //   let dir = parseInt(rand(3));
    //   moveRandom(dir);
    //   // wait(rand(0.5, 2.5), moveRandom);

    // })
    

    onUpdate("enemy", (enemy)=>{
      enemy.direction = "right";
      if (enemy.curAnim() !== "walk-side") enemy.play("walk-side");
      enemy.move(120,0)
      
      enemy.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          enemy.direction = -enemy.direction;
        }
    });
    })
  
    
    // enemy.loop(5, ()=>{
    //   console.log('5')
    //   console.log(enemy.curAnim())
    //   enemy.direction = "right";
    //   enemy.play("walk-side");
    //   if (enemy.curAnim() !== "walk-side") enemy.play("walk-side");
    //   enemy.move(120,0)
    //   stopAnims(enemy);
    // })
    
        // onUpdate("enemy", (enemy)=>{
        //   enemy.direction = "down";
        //    enemy.move(0,120)
        //    wait(2,  stopAnims(enemy));
     
        // })


 


    
    
  }
  
 
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
              green();
            }
            else if(boundary.name === 'home'){
              player.isInDialogue = false;
              home();
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


 

  
});

//greenField();

function green(){
  go("main", 
    {
      // level: (levelIndex + 1) % maps.length,
      // score: scoreLabel.value
      level:1,
      score: 1
    }
    );
}
function home(){
  go("main", 
    {
      // level: (levelIndex + 1) % maps.length,
      // score: scoreLabel.value
      level:0,
      score: 1
    }
    );
};

home();

