import React, { Component } from "react";
import { getHashParams } from "../../utils/utils.js";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Redirect } from "react-router-dom";
import { setAuthToken, setRefreshToken } from "../../actions/authActions";
class Auth extends Component {
  constructor() {
    super();
    this.state = { authToken: null };
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
    return <div />;
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
