const refresh_token_uri = process.env.REFRESH_TOKEN_URI;
import { getRefreshTokenRequest } from "../utils/auth";

export default class AuthAPI {
  static refreshAuthToken() {
    let url = refresh_token_uri;
    return getRefreshTokenRequest(url);
  }
}
