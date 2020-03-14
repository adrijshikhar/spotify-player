export function getHashParams() {
  let hashParams = {};
  let url = window.location.pathname.substring(6);
  let access_token = new URLSearchParams(url).get("access_token");
  let refresh_token = new URLSearchParams(url).get("refresh_token");

  hashParams = { access_token, refresh_token };
  return hashParams;
}
