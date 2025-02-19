import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import GameDetails from "./GameDetails.mjs";

loadHeaderFooter();

// get game Id
const gameId = getParams("game");
const dataSource = new ExternalServices();

const game = new GameDetails(gameId, dataSource);
game.init();
