/* eslint-disable no-console */
import { loadState, saveState, removeState } from "./cookie";
import request from "superagent";
import AuthAPI from "../api/auth";
export function getRequest(url, content = {}) {
  const token = loadState();

  return new Promise((resolve, reject) => {
    return request
      .get(url)
      .set("Authorization", `Bearer ${token.auth.access_token}`)
      .set("Accept", "application/json")
      .query(content)
      .end((err, res) => {
        if (err && err.status === 401) {
          console.log("Authorization required");
          removeState("auth");
          AuthAPI.refreshAuthToken().then(response => {
            const auth = {
              access_token: response.access_token,
              refresh_token: token.auth.access_token
            };
            console.log(response);
            saveState({ auth });
          });
        } else if (err) {
          reject(err);
        } else if (!res.ok) reject(res.body);
        else resolve(res.body);
      });
  });
}
