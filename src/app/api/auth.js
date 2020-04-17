import CONFIG from "../../../config/config";

const refresh_token_uri = CONFIG.refreshTokenUri;
import { getRefreshTokenRequest } from "../utils/auth";

export default class AuthAPI {
  static refreshAuthToken() {
    let url = refresh_token_uri;
    return getRefreshTokenRequest(url);
  }
}
