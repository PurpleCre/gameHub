const baseURL = "https://api.rawg.io/api/";
const key = import.meta.env.RAWG_API_KEY || "258c25d2a124455d9cb9e874f816cf1a";
console.log(key)

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
        this.baseURL + `games?key=${key}&page=1&pagesize=4`,
      );
      const data = await convertToJson(response);
      console.log(data.results);
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  
  async getTrending() {
    try {
      const response = await fetch(
        this.baseURL + `games?key=${key}&page=1&pagesize=4`,
      );
      const data = await convertToJson(response);
      console.log(data.results);
      return data.results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async findGameById(id) {
    console.log("findGameById", id);
    const response = await fetch(`${this.baseURL}games/${id}?key=${key}`);
    const data = await convertToJson(response);
    return data;
  }
}
