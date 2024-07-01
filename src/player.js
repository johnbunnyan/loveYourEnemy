
import { dialogueData, scaleFactor } from "./constants";


 function slimePlayer() {
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
      
      const player = make([
        sprite("spritesheet", { anim: "idle-down" }),
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


      export {slimePlayer, stopAnims}


     





  
