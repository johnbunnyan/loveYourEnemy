import { playerState } from "../state/stateManagers.js";

export function expBar(k) {
  // let nbFullHearts = Math.floor(playerState.getHealth());
  // let addHalfHeart = false;

  // if (playerState.getHealth() - nbFullHearts === 0.5) {
  //   addHalfHeart = true;
  // }

  // let nbEmptyHearts =
  //   playerState.getMaxHealth() - nbFullHearts - (addHalfHeart ? 1 : 0);
  let exps = 0;
  const expContainer = k.add([k.text(`xp:`),k.pos(20, 80), k.fixed(), "expContainer"]);
  const expPoint = k.add([k.text('0'),k.pos(90, 80), k.fixed(),"expPoint"]);

  //  if(playerState.getExp() === 0){
  //   expPoint.add([k.text(playerState.getExp()),k.pos(90, 0), k.fixed(),]);
  //  }
  //  else if (playerState.getExp() >= 0) {
  //   expPoint.add([k.text(playerState.getExp()),k.pos(90, 0), k.fixed(),]);

  // }
  // else if(playerState.getExp() >= 0) {
  //   k.destroy(expContainer);
  //   expContainer.add([k.text(`${playerState.getExp()}`),k.pos(20, 80), k.fixed(),]);

  // }
  
  // let previousX = 0;
  // for (let i = 0; i < nbFullHearts; i++) {
  //   expContainer.add([k.sprite("full-heart"), k.pos(previousX, 0)]);
  //   previousX += 48;
  // }

  // if (addHalfHeart) {
  //   expContainer.add([k.sprite("half-heart"), k.pos(previousX, 0)]);
  //   previousX += 48;
  // }

  // if (nbEmptyHearts > 0) {
  //   for (let i = 0; i < nbEmptyHearts; i++) {
  //     expContainer.add([k.sprite("empty-heart"), k.pos(previousX, 0)]);
  //     previousX += 48;
  //   }
  // }

  return {expContainer,expPoint};
}
