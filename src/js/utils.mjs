// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// helper to get parameter strings
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const term = urlParams.get(param);

  return term;
}

// helper to get term
export function getTerm() {
  const queryString = window.location.search;
  const term = queryString.split("/")[-1];

  return term;
}

// function to take a list of objects and a template and insert the objects as HTML into the DOM
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// function to take an optional object and a template and insert the objects as HTML into the DOM
export function renderWithTemplate(template, parentElement, callback, data) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  //if there is a callback...call it and pass data
  if (callback) callback(data);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, setSuperscript);
  renderWithTemplate(footerTemplate, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get cart item count and dispay superscript number
export async function setSuperscript() {
  try {
    // display superscript on cart icon
    const countEl = document.querySelector(".count");
    if (!countEl) return; // Exit if element not found

    // Retrieve cart items from local storage
    const cart = getLocalStorage("so-wishlist");
    if (!Array.isArray(cart)) {
      setLocalStorage("wishlist", []);
      return;
    }

    // Calculate total quantity of items in the cart
    const totalItems = cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0,
    );

    // Update the UI based on cart quantity
    if (totalItems > 0) {
      countEl.textContent = totalItems;
      countEl.classList.remove("hide");
    } else {
      countEl.classList.add("hide");
    }
  } catch (err) {
    console.error("Error in setSuperscript:", err);
  }
}
