import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";
import GameList from "./GameList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Favourites from "./Favourites.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const element = document.querySelector(".game-list");
const myList = new GameList(dataSource, element);
// finally call the getTrending method to show our trending games
myList.displayTrending();
// alert logic
const mainEl = document.querySelector("main");
const alerts = new Alert(mainEl);
alerts.init();
// Favourites logic
const favList = new Favourites("favs", ".fav-list");
favList.init();