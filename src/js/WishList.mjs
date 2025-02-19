import { qs, renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

// Template function for a single wishlist item
function wishlistItemTemplate(item) {
  // Use a fallback if the color isn’t specified
  const color = item.Colors?.[0]?.ColorName || "No color specified";
  return `
    <li class="wishlist-card divider">
      <button class="remove-wishlist" data-id="${item.id}">❌</button>
        <img src="${item.background_image}" alt="${item.name}" />
        <h2 class="card__name">${item.name}</h2>
      <p class="wishlist-card__color">${color}</p>
    </li>
  `;
}

// Main Wishlist class
export default class WishList {
  constructor(key, listElementSelector) {
    this.key = key;
    this.listElement = qs(listElementSelector);
    this.wishlistItems = [];
  }

  // Called once on DOMContentLoaded (or whenever you want to initialize the cart)
  init() {
    this.wishlistItems = getLocalStorage(this.key) || [];
    this.renderWishlistContents();
    this.attachWishlistListeners();
  }

  attachWishlistListeners() {
    // Attach event listeners for wishlist removing actions
    const wishlistElement = this.listElement;
    if (!wishlistElement) {
      console.error("No wish container found - check your HTML for an element with class 'wishlist'.")
      return;
    }

    wishlistElement.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const id = parseInt(button.dataset.id, 10);
      if (isNaN(id)) {
        console.error("Invalid game id:", button.dataset.id);
        return;
      }
      if (button.classList.contains("remove-wishlist")) {
        if (confirm("Are you sure you want to remove this item from your wishlist?") == true) {
          // Remove item from wishlist:
          let wishlist = getLocalStorage(this.key) || [];
          let newWishlist = wishlist.filter(item => parseInt(item.id, 10) !== id);
          setLocalStorage("so-wishlist", newWishlist);
          window.location.reload();
        }
      }
    });
  }

  // Render wishlist items from localStorage
  renderWishlistContents() {
    const wishlistElement = this.listElement;
    const wishlistItems = getLocalStorage(this.key) || [];
    wishlistElement.innerHTML = ""; // Clear previous content
    renderListWithTemplate(wishlistItemTemplate, wishlistElement, wishlistItems);
  }
}
