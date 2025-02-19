import { qs, renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

// Template function for a single fav item
function favItemTemplate(item) {
  // Use a fallback if the color isn’t specified
  const color = item.Colors?.[0]?.ColorName || "No color specified";
  return `
    <li class="fav-card divider">
      <button class="remove-fav" data-id="${item.id}">❌</button>
        <img src="${item.background_image}" alt="${item.name}" />
        <h2 class="card__name">${item.name}</h2>
      <p class="fav-card__color">${color}</p>
    </li>
  `;
}

// Main fav class
export default class favList {
  constructor(key, listElementSelector) {
    this.key = key;
    this.listElement = qs(listElementSelector);
    this.favItems = [];
  }

  // Called once on DOMContentLoaded (or whenever you want to initialize the cart)
  init() {
    this.favItems = getLocalStorage(this.key) || [];
    this.renderFavContents();
    this.attachFavListeners();
  }

  attachFavListeners() {
    // Attach event listeners for fav removing actions
    const favElement = this.listElement;
    if (!favElement) {
      console.error("No fav container found - check your HTML for an element with class 'fav'.")
      return;
    }

    favElement.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const id = parseInt(button.dataset.id, 10);
      if (isNaN(id)) {
        console.error("Invalid game id:", button.dataset.id);
        return;
      }
      if (button.classList.contains("remove-fav")) {
        if (confirm("Are you sure you want to remove this game from your favourites?") == true) {
            // Remove item from fav:
            let fav = getLocalStorage(this.key) || [];
            fav = fav.filter(item => parseInt(item.id, 10) !== id);
            setLocalStorage("favs", fav);
            window.location.reload();
        }
      }
    });
  }

  // Render fav items from localStorage
  renderFavContents() {
    const favElement = this.listElement;
    const favItems = getLocalStorage(this.key) || [];
    favElement.innerHTML = ""; // Clear previous content
    renderListWithTemplate(favItemTemplate, favElement, favItems);
  }
}
