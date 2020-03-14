export function setAuthToken(token) {
  return {
    type: "ACCESS_TOKEN",
    payload: token
  };
}
export function setRefreshToken(token) {
  return {
    type: "REFRESH_TOKEN",
    payload: token
  };
}
