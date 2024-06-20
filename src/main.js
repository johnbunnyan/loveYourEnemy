import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

// 디버그를 할 수 있는 메서드
// k.debug.inspect =true

// 1. 화면에 사용할 스프라이트 이미지를 불러오기

// 애니메이션이 있는 스프라이트는 종이를 자르듯이 slice해서 사용
  k.loadSprite("spritesheet", "./spritesheet.png", {
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




// 맵 사용법
// loadSprite로 맵 png를 받는다
k.loadSprite("map", "./map.png");
k.loadSprite("new", "./new.png");

k.loadSprite("left", "./arrow_left_light.png");
k.loadSprite("right", "./arrow_right_light.png");
k.loadSprite("up", "./arrow_up_light.png");
k.loadSprite("down", "./arrow_down_light.png");

// 맵 밖의 바탕화면 색 지정
k.setBackground(k.Color.fromHex("#5ba675"));



// One-liner to resume playback when user interacted with the page.
document.querySelector('button').addEventListener('click', function() {
  // Existing code unchanged.
window.onload = function() {
  var context = new AudioContext();
  // Setup all nodes
  // ...
  console.log(context)
}

  context.resume().then(() => {
    console.log('Playback resumed successfully');
  });
});


k.loadSound("music", "./bgm.mp3").then((music) =>{
  k.play("music");
});

k.scene("main", async () => {
  
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
  


  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
  "player"
  ]);

  const leftButton = k.add([
    k.sprite('left'),
    //50,560
    k.pos(50, 560),
    k.opacity(0.5),
    k.scale(1.5,1.5),
    k.fixed(),
    k.area(),
    "leftButton"
  ]);
  
  const rightButton = k.add([
    k.sprite('right'),
    k.pos(150, 560),
    k.opacity(0.5),
    k.scale(1.5,1.5),
    k.fixed(),
    k.area(),
    "rightButton"
  ]);
  
  const upButton = k.add([
    k.sprite('up'),
    k.pos(100, 510),
    k.opacity(0.5),
    k.scale(1.5,1.5),
    k.fixed(),
    k.area(),
    "upButton"
  ]);
  
  const downButton = k.add([
    k.sprite('down'),
    k.pos(100, 610),
    k.opacity(0.5),
    k.scale(1.5,1.5),
    k.fixed(),
    k.area(),
    "downButton"
  ]);

  //
 
  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);


        if (boundary.name) {

      
          player.onCollide(boundary.name, () => {
            if(boundary.name === 'exit'){
              player.isInDialogue = false;
               k.go("field");
            }
            

            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false)
            );
          });
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.worldPos().x, player.worldPos().y - 100);
  });




const keyDown = {
left:false,
right:false,
up:false,
down:false
};



const moveLeft = () => {
  
  player.move(-player.speed, 0);
}
const moveRight = () => {
  player.move(player.speed, 0);
}
const moveUp = () => {
 
  player.move(0, -player.speed);
}

const moveDown = () => {
  player.move(0, player.speed);
}

k.onKeyDown('left', () => {
  keyDown.left =true
  player.flipX = true;
  if (player.curAnim() !== "walk-side") player.play("walk-side");
  player.direction = "left";
})

k.onKeyRelease('left', () => {
  keyDown.left = false
})

k.onKeyDown('right', () => {
  keyDown.right =true
  player.flipX = false;
  if (player.curAnim() !== "walk-side") player.play("walk-side");
  player.direction = "right";
})

k.onKeyRelease('right', () => {
  keyDown.right = false
})

k.onKeyDown('up', () => {
  keyDown.up =true
  if (player.curAnim() !== "walk-up") player.play("walk-up");
    player.direction = "up";
})

k.onKeyRelease('up', () => {
  keyDown.up = false
})


k.onKeyDown('down', () => {
  keyDown.down =true
  if (player.curAnim() !== "walk-down") player.play("walk-down");
  player.direction = "down";
})

k.onKeyRelease('down', () => {
  keyDown.down = false
})


k.onUpdate(()=>{
  if(keyDown.left){
    moveLeft()
  }
  else if(keyDown.right){
    moveRight()
  }
  else if(keyDown.up){
    moveUp()
  }
  else if(keyDown.down){
    moveDown()
  }
})


k.onTouchStart((id,pos) => {
 
const buttonMap = [
  rightButton.hasPoint({x:pos.clientX,y:pos.clientY}),
  leftButton.hasPoint({x:pos.clientX,y:pos.clientY}),
  upButton.hasPoint({x:pos.clientX,y:pos.clientY}),
  downButton.hasPoint({x:pos.clientX,y:pos.clientY})

]

// k.onUpdate(()=>{
  if (buttonMap[0]) {
    rightButton.opacity = 1;
    keyDown.right = true;

    player.flipX = false;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
    player.direction = "right";
    player.move(player.speed, 0);
    return;
   
  }

  else if (buttonMap[1]) {
    leftButton.opacity = 1;
    keyDown.left = true;

    player.flipX = true;
    if (player.curAnim() !== "walk-side") player.play("walk-side");
    player.direction = "left";
    player.move(-player.speed, 0);
    return;
  }

  else if (buttonMap[2]) {
    upButton.opacity = 1;
    keyDown.up = true;

    if (player.curAnim() !== "walk-up") player.play("walk-up");
    player.direction = "up";
    player.move(0, -player.speed);
    return;
  }

  else if (buttonMap[3]) {
    downButton.opacity = 1;
    keyDown.down = true;

    if (player.curAnim() !== "walk-down") player.play("walk-down");
    player.direction = "down";
    player.move(0, player.speed);
    return;
  }
  
})


const onTouchChanged = (_,pos)=>{
 
    if(leftButton.hasPoint({x:pos.clientX,y:pos.clientY})){
      keyDown.left = false
      leftButton.opacity = 0.5
    }
    
    else if(rightButton.hasPoint({x:pos.clientX,y:pos.clientY})){
      keyDown.right = false
      rightButton.opacity = 0.5
    }
   
    else if(upButton.hasPoint({x:pos.clientX,y:pos.clientY})){
      keyDown.up = false
      upButton.opacity = 0.5
    }
    else if(downButton.hasPoint({x:pos.clientX,y:pos.clientY})){
      keyDown.down = false
      downButton.opacity = 0.5
    }
    stopAnims();
   
}






k.onTouchMove(onTouchChanged)
k.onTouchEnd(onTouchChanged)










  // 화면에 클릭하면 해당 방향으로 Player를 이동시켜주는 기능
  k.onMouseDown((mouseBtn) => {
    //mouseBtn -> 왼쪽 클릭/오른쪽 클릭/마우스휠 등
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });

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

  k.onMouseRelease(stopAnims);

  k.onKeyRelease(() => {
    stopAnims();
  });


   // 해당 키 방향대로 player를 이동시켜주는 기능
  k.onKeyDown((key) => {

    //isKeyDown으로 키보드의 입력 정보를 받음
    const keyMap = [
      k.isKeyDown("d"),
      k.isKeyDown("a"),
      k.isKeyDown("w"),
      k.isKeyDown("s"),
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



k.scene("field", async () => {
  const FmapData = await (await fetch("./new.json")).json();

  const layers = FmapData.layers;

  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);
//   k.add([
//     k.text("Game Over"),
// ])
});
// 여기서 파라미터로 넘긴 애들은 해당 파일 내에서 전역으로 'args'로 꺼내 쓸 수 있음
// score 생기면 쓸 예정

k.go("main", 
// {
//   level: (levelIndex + 1) % maps.length,
//   score: scoreLabel.value
// }
);
