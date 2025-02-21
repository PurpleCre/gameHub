import { getLocalStorage, setLocalStorage, setSuperscript } from "./utils.mjs";

export default class GameDetails {
  constructor(gameId, dataSource) {
    this.gameId = gameId;
    this.game = {};
    this.dataSource = dataSource;
  }
  async init() {
    // Retrieve game details and render HTML
    this.game = await this.dataSource.findGameById(this.gameId);
    this.renderGameDetails(this.game);

    // Attach listeners for both buttons
    document.getElementById("addToFav")
      .addEventListener("click", this.addToFav.bind(this));
    document.getElementById("addToWishlist")
      .addEventListener("click", this.addToWishlist.bind(this));
  }
  addToFav() {
    // Retrieve the cart from local storage or initialize an empty array
    let games = getLocalStorage("favs") || [];
    // Check if the game already exists in the cart
    let existingGame = games.find(item => item.id === this.game.id);

    if (existingGame) {
      // If game exists, alert the user
      alert(`${existingGame.name} already in favourites`);
      return;
    } else {
      // If game does not exist, add to favourites
      games.push(this.game);
    }

    // Save updated cart back to local storage
    setLocalStorage("favs", games);

    // Notify user
    alert(`${this.game.name} added to favourites`);
  }
  addToWishlist() {
    let wishlist = getLocalStorage("so-wishlist") || [];

    // Check if the game is already in the wishlist
    let existing = wishlist.find(item => item.id === this.game.id);
    if (existing) {
      alert("This item is already in your wishlist.");
      return;
    }
    wishlist.push(this.game);
    setLocalStorage("so-wishlist", wishlist);
    alert(`${this.game.name} added to wishlist`);
  }

  // Add breadcrumbs to the page
  handleBrandCrumbs() {
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    breadcrumbsElement.innerHTML = `<span class="c">${this.game.name}</span>`
  }

  // Generate HTML display
  renderGameDetails(game) {
    let newGame = ""

    newGame += `
    <h3>${game.name}</h3>
    <h2 class="divider">${game.name}</h2>
    <picture class="divider">
      <source media="(max-width: 500px)" srcset="${game.background_image}" />
      <img loading="lazy" src="${game.background_image}" alt="${game.name}" />
    </picture>
    <p class="rating">Rating: <br>${game.rating}</p>
    <div class="game__description">
      ${game.description}
    </div>
    <div class="game-detail__actions">
      <button id="addToFav" data-id="${game.Id}">Add to Favourites</button>
      <button id="addToWishlist" data-id="${game.Id}">Add to Wishlist</button>
    </div>
  `;

    document.querySelector(".game-detail").innerHTML = newGame;
  }
}


