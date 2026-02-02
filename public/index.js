import BoardManager from "./js/views/board.js";
import GlobalRules from "./js/rules/globalRules.js";

const globalRules = new GlobalRules();
new BoardManager(globalRules);
