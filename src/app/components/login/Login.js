import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="home-login">
        <a href="http://localhost:8888/login">
          <button className="login-button-container">Login to Spotify</button>
        </a>
      </div>
    );
  }
}

export default Login;
