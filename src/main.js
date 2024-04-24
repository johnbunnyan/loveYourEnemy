/* NOTE 
하고 싶은 것
1. 100번 쓰기 기능 추가
: 침대에서 맨 처음 주인공만 가리고 나머지 암흑으로 연출, 100번 쓰기 마치면 게임시작

2. 주인공은 몬스터로, 몬스터는 사람들로

3. 씬 배경 추가하기

4. 스프라이트 추가하기
*/

/* TODO
 1. 구조 파악하며 주석달기


 */


import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

//SECTION 1. loadSprite
// 스프라이트시트랑 맵 PNG들을 카ㅜ

/* 초기값
sliceX/Y - 종이를 가위로 자를 때 그 시작점
아래 anims에서 값에 따라 의도한 스프라이트 바뀔 수 있음

sliceX: 39,
sliceY: 31,
anims: {
  "idle-down": 936,
  "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
  "idle-side": 975,
  "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
  "idle-up": 1014,
  "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },

from/to - 스프라이트시트의 x축 조정
from x축 시작
to x축 끝

스프라이트 side 의 양 옆구분은 의미없는 듯
엔진에서 자체로 그냥 한쪽을 Y축 기준으로 뒤집어서 처리해줌
*/

// FIXME anims의 from의 값 기준이 뭔지???

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


// 맵 밖의 바탕화면 색 지정
k.setBackground(k.Color.fromHex("#5ba675"));

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
    "player",
  ]);

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

  k.onMouseDown((mouseBtn) => {
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
  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;
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

k.go("main");
