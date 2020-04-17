module.exports = {
  CLIENT_IP: "127.0.0.1",
  CLIENT_PORT: "8000",
  SERVER_PORT: "8888",
  baseUri: "https://api.spotify.com/v1",
  searchUri: "https://api.spotify.com/v1/search",
  serverUri: "http://localhost:8888/",
  redirectUri: "http://localhost:8888/callback",
  refreshTokenUri: "http://localhost:8888/refresh_token",
  authUri: "https://accounts.spotify.com/authorize",
  auth: {
    client: {
      id: "", //enter generated client id from the spotify api
      secret: "" // enter generated client secret from spotify api
    },
    auth: {
      tokenHost: "https://api.spotify.com/v1/me",
      tokenPath: "https://accounts.spotify.com/api/token",
      authorizePath: "https://accounts.spotify.com/authorize"
    },
    scopes: ["user-read-currently-playing", "user-read-playback-state"]
  }
};
