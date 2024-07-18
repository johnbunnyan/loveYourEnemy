

import { stopAnims } from "./player";



function moveKeyRegacy(e){
  
    //isKeyDown으로 키보드의 입력 정보를 받음

    const keyMap = [
      isKeyDown("right"),
      isKeyDown("left"),
      isKeyDown("up"),
      isKeyDown("down"),
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
  }

function moveKey(keyDown,player) {    
    
onKeyDown('left', () => {

  keyDown.left =true
  player.flipX = true;
  if (player.curAnim() !== "walk-side") player.play("walk-side");
  player.direction = "left";
})

onKeyRelease('left', () => {
  keyDown.left = false
})

onKeyDown('right', () => {
  keyDown.right =true
  player.flipX = false;
  if (player.curAnim() !== "walk-side") player.play("walk-side");
  player.direction = "right";
})

onKeyRelease('right', () => {
  keyDown.right = false
})

onKeyDown('up', () => {
  keyDown.up =true
  if (player.curAnim() !== "walk-up") player.play("walk-up");
    player.direction = "up";
})

onKeyRelease('up', () => {
  keyDown.up = false
})


onKeyDown('down', () => {
  keyDown.down =true
  if (player.curAnim() !== "walk-down") player.play("walk-down");
  player.direction = "down";
})

onKeyRelease('down', () => {
  keyDown.down = false
})

}

function createButton(){
  const ui = add([
    fixed(),
    z(100),
]);

  const leftButton = ui.add([
  sprite('left'),
  //50,560
  pos(50, 560),
  opacity(0.5),
  scale(1.5,1.5),
  fixed(),
  area(),
  "leftButton"
]);

const rightButton = ui.add([
  sprite('right'),
  pos(150, 560),
  opacity(0.5),
  scale(1.5,1.5),
  fixed(),
  area(),
  "rightButton"
]);

const upButton = ui.add([
  sprite('up'),
  pos(100, 510),
  opacity(0.5),
  scale(1.5,1.5),
  fixed(),
  area(),
  "upButton"
]);

const downButton = ui.add([
    sprite('down'),
    pos(100, 610),
    opacity(0.5),
    scale(1.5,1.5),
    fixed(),
    area(),
    "downButton"
  ]);
  return {leftButton,rightButton,downButton,upButton};
};

// function leftButtonCreate(){
//   return add([
//     sprite('left'),
//     //50,560
//     pos(50, 560),
//     opacity(0.5),
//     scale(1.5,1.5),
//     fixed(),
//     area(),
//     "leftButton"
//   ]);
// }

// function rightButtonCreate(){
//   return add([
//     sprite('right'),
//     pos(150, 560),
//     opacity(0.5),
//     scale(1.5,1.5),
//     fixed(),
//     area(),
//     "rightButton"
//   ]);
// }


// function upButtonCreate(){
//   return add([
//     sprite('up'),
//     pos(100, 510),
//     opacity(0.5),
//     scale(1.5,1.5),
//     fixed(),
//     area(),
//     "upButton"
//   ]);
// }


// function downButtonCreate(){
//   return add([
//     sprite('down'),
//     pos(100, 610),
//     opacity(0.5),
//     scale(1.5,1.5),
//     fixed(),
//     area(),
//     "downButton"
//   ]);
// }


function moveAction(keyDown,player){

  onUpdate(()=>{
    if(keyDown.left){
      player.move(-player.speed, 0);
    }
    else if(keyDown.right){
      player.move(player.speed, 0);
    }
    else if(keyDown.up){
      player.move(0, -player.speed);
    }
    else if(keyDown.down){
      player.move(0, player.speed);
    }
  })
};

function onTouchStartFn(keyDown,player,leftButton,rightButton,upButton,downButton){
// 여기는 keyDown 객체의 상태를 true로 만들어줘서 위 이벤트가 작동하도록 하는 전단계
onTouchStart((id,pos) => {
 
  const buttonMap = [
    rightButton.hasPoint({x:pos.clientX,y:pos.clientY}),
    leftButton.hasPoint({x:pos.clientX,y:pos.clientY}),
    upButton.hasPoint({x:pos.clientX,y:pos.clientY}),
    downButton.hasPoint({x:pos.clientX,y:pos.clientY})
  
  ]
  
    if (buttonMap[0]) {
      rightButton.opacity = 1;
      keyDown.right = true;
  
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      // player.move(player.speed, 0);
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
  
};


function touchEnd(keyDown,player,leftButton,rightButton,upButton,downButton){
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
    stopAnims(player);
   
  }
  
  
  onTouchMove(onTouchChanged)
  onTouchEnd(onTouchChanged)
}






function onMouseDownFn(player){
  onMouseDown((mouseBtn) => {
    //mouseBtn -> 왼쪽 클릭/오른쪽 클릭/마우스휠 등
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = toWorld(mousePos());
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

};







  export { moveKeyRegacy,
    moveKey, 
    // leftButtonCreate, 
    // rightButtonCreate,
    //  upButtonCreate, 
    //  downButtonCreate,
     moveAction,
     onTouchStartFn,
     touchEnd,
     onMouseDownFn,
     createButton,
    }