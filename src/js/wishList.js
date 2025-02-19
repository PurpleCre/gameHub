import { loadHeaderFooter } from "./utils.mjs";
import WishList from "./WishList.mjs";

//Load the site header and footer
loadHeaderFooter();

//Create a new cart instance and initialize it
const wishlist = new WishList("so-wishlist", ".wishlist");
wishlist.init();
