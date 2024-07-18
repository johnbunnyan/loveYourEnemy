
import { dialogueData, scaleFactor } from "./constants";


 function slimePlayer() {
    loadSprite("slime", "./spritesheet.png", {
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
      
      const player = make([
        sprite("slime", { anim: "idle-down" }),
        area({
          shape: new Rect(vec2(0, 3), 10, 10),
        }),
        body(),
        anchor("center"),
        pos(),
        scale(scaleFactor),
        {
          speed: 250,
          direction: "down",
          isInDialogue: false,
        },
      "player"
      ]);


      return player;
    };

    function stopAnims(settedPlayer) {
        if (settedPlayer.direction === "down") {
            settedPlayer.play("idle-down");
          return;
        }
        if (settedPlayer.direction === "up") {
            settedPlayer.play("idle-up");
          return;
        }
    
        settedPlayer.play("idle-side");
      }

      function enemyPlayer() {
        loadSprite("enemy", "./spritesheet.png", {
          sliceX: 39,
          sliceY: 30.97,
            anims: {
              "idle-down": 936,
              "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
              "idle-side": 975,
              "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
              "idle-up": 975,
              "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
            },
          });
          
          // custom component controlling enemy patrol movement
function patrol(speed = 60, dir = 1) {
  return {
      id: "patrol",
      require: ["pos", "area"],
      add() {
          this.on("collide", (obj, col) => {
              if (col.isLeft() || col.isRight()) {
                  dir = -dir;
              }
          });
      },
      update() {
        if(dir === 1){
          this.direction = "right";
        this.play("walk-side");
        }
        else if(dir === -1){
          this.direction = "left";
          this.play("walk-side");
        }
        this.move(speed * dir, 0);
        
      },
  };
}

          
          const enemy = make([
            sprite("enemy", { anim: "idle-down" }),
            area({
              shape: new Rect(vec2(0, 3), 10, 10),
            }),
            body(),
            timer(),
            anchor("center"),
            pos(),
            // patrol(),
            scale(scaleFactor),
            {
              speed: 250,
              direction: "down",
              isInDialogue: false,
            },
          "enemy"
          ]);
    
    
          return enemy;
        };

      export {
        slimePlayer,
         stopAnims, 
         enemyPlayer, }


     





  
