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
    let token = getHashParams();
    if (token) {
      this.setState({
        accessToken: token.access_token,
        refreshToken: token.refresh_token
      });
      this.props.setAuthToken(token.access_token);
      this.props.setRefreshToken(token.refresh_token);
    }
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
  access_token: state.auth.access_token,
  refresh_token: state.auth.refresh_token
});

Auth.propTypes = {
  setAuthToken: PropTypes.func.isRequired,
  setRefreshToken: PropTypes.func.isRequired,
  access_token: PropTypes.string,
  refresh_token: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
