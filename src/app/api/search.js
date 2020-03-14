const base_url = process.env.BASE_URL;
import { getRequest } from "../utils/request";

export default class SearchAPI {
  static searchTracks(params) {
    let url = `${base_url}/search/`;
    let content = {
      q: params || "rock",
      type: "track"
    };
    return getRequest(url, content);
  }
}
