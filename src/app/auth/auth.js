const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "d422bafab10a47b9b31387727b3b6873";
const redirectUri = "http://localhost:8000";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial, item) => {
    if (item) {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
export { authEndpoint, clientId, redirectUri, scopes, hash };
