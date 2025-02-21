import { renderListWithTemplate } from "./utils.mjs";

function gameCardTemplate(game) {
  console.log(game.id);
  let html = `<li class="product-card">
        <a href="../game_pages/index.html?game=${game.id}">
        <picture class="divider">
          <source media="(max-width: 500px)" srcset="${game.background_image}" />
          <img loading="lazy" src="${game.background_image}" alt="Image of ${game.name}" />
        </picture>
        <h3 class="card__brand">${game.genres[0].name}</h3>
        <h2 class="card__name">${game.name}</h2>
    `;
  html += `</a>
        </li>
    `;

  return html;
}

export default class GameList {
  constructor(dataSource, listEl) {
    this.dataSource = dataSource;
    this.listEl = listEl;
  }

  // Sort the games/list by rating or name
  sortList(list, criteria) {
    if (criteria === "Name") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "Rating") {
      return list.sort((a, b) => a.rating - b.rating);
    }
    return list;
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      if (!list) {
        throw new Error("No data received from server");
      }

      // render the list
      this.renderList(list);

      this.sort(list);

    } catch (error) {
      console.error("Error in init:", error);
      if (this.listEl) {
        this.listEl.innerHTML = `<li class="error">Error loading products. Please try again later.</li>`;
      }
    }
  }

  async displayTrending() {
    try {
      const list = await this.dataSource.getTrending();
      if (!list) {
        throw new Error("No data received from server");
      }

      // filter the list to 4 games
      const filteredList = this.filterList(list);

      // render the list
      this.renderList(filteredList);

    } catch (error) {
      console.error("Error in init:", error);
      if (this.listEl) {
        this.listEl.innerHTML = `<li class="error">Error loading products. Please try again later.</li>`;
      }
    }
  }

  filterList(list, num = 4) {
    return list.slice(0, num);
  }

  sort(list) {
          // Sort the products/list by price or name
          const sortElement = document.getElementById("sort");
          sortElement.addEventListener("change", (event) => {
            const sortedList = this.sortList(list, event.target.value);
            this.renderList(sortedList);
          });
  }

  // render template lists
  renderList(list) {
    renderListWithTemplate(gameCardTemplate, this.listEl, list);
  }

  // Add breadcrumbs to the page
  handleBrandCrumbs(list) {
    const breadcrumbsElement = document.querySelector("#breadcrumbs");
    breadcrumbsElement.innerHTML = `<span class="path">games</span> <span class="arrow">></span><span class="path">(${list.length} games)</span>`;
  }
}
