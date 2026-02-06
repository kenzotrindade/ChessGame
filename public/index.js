import BoardManager from "./js/views/board.js";
import GlobalRules from "./js/rules/GlobalRules.js";

const globalRules = new GlobalRules();
new BoardManager(globalRules);
