import { loadState } from "./cookie";
import request from "superagent";

export function getRefreshTokenRequest(url) {
  const token = loadState();
  const content = { refresh_token: token.refresh_token };
  return new Promise((resolve, reject) => {
    return request
      .get(url)
      .set("Accept", "application/json")
      .query(content)
      .end((err, res) => {
        if (err) reject(err);
        else if (!res.ok) reject(res.body);
        else resolve(res.body);
      });
  });
}
