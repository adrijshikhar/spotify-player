export const CLIENT_IP = "127.0.0.1";
export const CLIENT_PORT = "8000";
export const SERVER_PORT = "8888";
export const baseUri = "https://api.spotify.com/v1";
export const searchUri = "https://api.spotify.com/v1/search";
export const serverUri = "http://localhost:8888/";
export const redirectUri = "http://localhost:8888/callback";
export const refreshTokenUri = "http://localhost:8888/refresh_token";
export const authUri = "https://accounts.spotify.com/authorize";
export const auth = {
  client: {
    id: "",
    secret: ""
  },
  auth: {
    tokenHost: "https://api.spotify.com/v1/me",
    tokenPath: "https://accounts.spotify.com/api/token",
    authorizePath: "https://accounts.spotify.com/authorize"
  },
  scopes: ["user-read-currently-playing", "user-read-playback-state"]
};
