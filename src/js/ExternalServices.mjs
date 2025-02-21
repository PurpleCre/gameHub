const baseURL = "https://api.rawg.io/api/";
const key = import.meta.env.RAWG_API_KEY || "258c25d2a124455d9cb9e874f816cf1a";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

export default class ExternalServices {
  constructor() {
    // Make sure baseURL ends with a slash and uses HTTPS
    let url = baseURL.endsWith("/") ? baseURL : baseURL + "/";
    this.baseURL = url.replace("http://", "https://");
  }

  async getData() {
    try {
      const response = await fetch(
        this.baseURL + `games?key=${key}&page=4&page_size=20`,
      );
      const data = await convertToJson(response);
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  
  async getTrending() {
    try {
      const response = await fetch(
        this.baseURL + `games?key=${key}&dates=2024-01-01,2025-02-20&ordering=-added&page=1`,
      );
      const data = await convertToJson(response);
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async findGameById(id) {
    const response = await fetch(`${this.baseURL}games/${id}?key=${key}`);
    const data = await convertToJson(response);
    return data;
  }
}
