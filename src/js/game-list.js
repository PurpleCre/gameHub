import ExternalServices from "./ExternalServices.mjs";
import GameList from "./GameList.mjs";
import { loadHeaderFooter, getParams, getTerm } from "./utils.mjs";

loadHeaderFooter();

// first create an instance of our GameData class.
// document.getElementById("title").innerText = `Top ${term}`;
// then update page title with term
const dataSource = new ExternalServices();
// then get the element we want the Game list to render in
const listElement = document.querySelector(".showcase-list");
// then create an instance of our GameList class and send it the correct information.
const myList = new GameList(dataSource, listElement);
// finally call the init method to show our Games
myList.init();