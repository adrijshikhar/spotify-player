export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "d422bafab10a47b9b31387727b3b6873";
export const redirectUri = "http://localhost:8000";
export const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state"
];
export function getHashParams() {
  let hashParams = {};
  let url = window.location.pathname.substring(6);
  let access_token = new URLSearchParams(url).get("access_token");
  let refresh_token = new URLSearchParams(url).get("refresh_token");

  hashParams = { access_token, refresh_token };
  return hashParams;
}
