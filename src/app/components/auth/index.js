import React, { Component } from "react";
import { getHashParams } from "../../utils/auth.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { setAuthToken, setRefreshToken } from "../../actions/authActions";
let Spotify = require("spotify-web-api-js");

class Auth extends Component {
  constructor() {
    super();
    this.state = { authToken: "" };
  }
  componentDidMount() {
    this.fetchAPIDetails();
  }

  fetchAPIDetails = () => {
    // Set token
    let auth_token = getHashParams().access_token;
    if (auth_token) {
      // Set token
      this.setState({
        authToken: auth_token
      });
      this.props.setAuthToken(auth_token);
    }
    let spotifyApi = new Spotify();
    console.log(spotifyApi);
  };

  render() {
    // const { authToken } = this.state;
    return (
      <div>
        <a href="http://localhost:8888/login"> Login to Spotify </a>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAuthToken: token => {
    dispatch(setAuthToken(token));
  },
  setRefreshToken: token => {
    dispatch(setRefreshToken(token));
  }
});

const mapStateToProps = state => ({
  access_token: state.auth,
  refresh_token: state.auth
});
Auth.propTypes = {
  setAuthToken: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
