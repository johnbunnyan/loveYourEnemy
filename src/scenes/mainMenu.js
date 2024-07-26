import menuText from "../content/menuText.js";
import { gameState } from "../state/stateManagers.js";
import { colorizeBackground } from "../utils.js";

let myLocale = 0;

export default function mainMenu(k) {
  const locales = ["english", "french", "korean"];

  const currentLocale = gameState.getLocale();
console.log(currentLocale)

  colorizeBackground(k, 0, 0, 0);

  k.add([
    k.text(menuText[currentLocale].title, { size: 32, font: "gowun" }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  k.add([
    k.text(menuText[currentLocale].languageIndication, {
      size: 15,
      font: "gowun",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.add([
    k.text(menuText[currentLocale].playIndication, {
      size: 30,
      font: "gowun",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onKeyPress("f" || 'ㄹ', () => {
    myLocale += 1;
    myLocale = myLocale % 3;
    gameState.setLocale(locales[myLocale]);
    // if (currentLocale !== "french") gameState.setLocale("french");
    // if (currentLocale !== "korean") gameState.setLocale("korean");
    // if (currentLocale !== "english") gameState.setLocale("english");
    k.go("mainMenu");
  });

  k.onKeyPress("enter", () => {
    if (gameState.getLocale() === "french") gameState.setFontSize(28);
    k.go("world");
  });
}
