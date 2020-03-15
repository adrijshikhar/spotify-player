const base_url = process.env.BASE_URL;
import { getRequest } from "../utils/request";

export default class SearchAPI {
  static searchTracks(params) {
    let url = `${base_url}/search/`;
    let content = {
      q: params.searchInput || "rock",
      market: params.markets || undefined,
      type: "track",
      offset: params.offset
    };
    return getRequest(url, content);
  }

  static searchTracksByArtistName(params) {
    let url = `${base_url}/search/`;
    let content = {
      q: params.searchInput || "rock",
      type: "track,artist",
      offset: params.offset
    };
    return getRequest(url, content);
  }
}
