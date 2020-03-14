import { loadState } from "./cookie";
import request from "superagent";

export function getRequest(url, content) {
  const token = loadState();

  return new Promise((resolve, reject) => {
    return request
      .get(url)
      .set("Authorization", `Bearer ${token.auth.access_token}`)
      .set("Accept", "application/json")
      .query(content)
      .end((err, res) => {
        if (err) reject(err);
        else if (!res.ok) reject(res.body);
        else resolve(res.body);
      });
  });
}
