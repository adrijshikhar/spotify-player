/* eslint-disable no-console */
/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

let express = require("express"); // Express web server framework
let request = require("request"); // "Request" library
let cors = require("cors");
let querystring = require("querystring");
let cookieParser = require("cookie-parser");

let CONFIG = require("../config/config");

let client = CONFIG.auth.client; // Your client id
let redirect_uri = CONFIG.redirectUri; // Your redirect uri

let scope = CONFIG.auth.scopes;

const SERVER_PORT = CONFIG.SERVER_PORT || 8888;
const CLIENT_PORT = CONFIG.CLIENT_PORT || 8000;

const tokenAuth = CONFIG.auth.auth;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
let generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = "spotify_auth_state";

let app = express();

app
  .use(express.static(`${__dirname}/public`))
  .use(cors())
  .use(cookieParser());

app.get("/login", (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  res.redirect(
    `${tokenAuth.authorizePath}?${querystring.stringify({
      response_type: "code",
      client_id: client.id,
      scope,
      redirect_uri,
      state
    })}`
  );
});

app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect(
      `http://localhost:${CLIENT_PORT}/auth/${querystring.stringify({
        error: "state_mismatch"
      })}`
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: tokenAuth.tokenPath,
      form: {
        code,
        redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: `Basic ${new Buffer(
          `${client.id}:${client.secret}`
        ).toString("base64")}`
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        let refresh_token = body.refresh_token;

        let options = {
          url: tokenAuth.tokenHost,
          headers: { Authorization: `Bearer ${access_token}` },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `http://localhost:${CLIENT_PORT}/auth/${querystring.stringify({
            access_token,
            refresh_token
          })}`
        );
      } else {
        res.redirect(
          `http://localhost:${CLIENT_PORT}/auth/${querystring.stringify({
            error: "invalid_token"
          })}`
        );
      }
    });
  }
});

app.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: tokenAuth.tokenPath,
    headers: {
      Authorization: `Basic ${new Buffer(
        `${client.id}:${client.secret}`
      ).toString("base64")}`
    },
    form: {
      grant_type: "refresh_token",
      refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token
      });
    }
  });
});

console.log("Listening on 8888");
app.listen(8888);
