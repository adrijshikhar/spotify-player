import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchAPI from "../../api/search";
class Home extends Component {
  componentDidMount() {
    SearchAPI.searchTracks("love").then(response => {
      console.log(response);
    });
  }
  render() {
    return (
      <div className="home-container">
        {!this.props.access_token ? (
          <div className="home-login">
            <a href="http://localhost:8888/login">
              <button className="login-button-container">
                Login to Spotify
              </button>
            </a>
          </div>
        ) : (
          <div>logged in</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  refresh_token: state.auth.refresh_token
});

Home.propTypes = {
  access_token: PropTypes.string,
  refresh_token: PropTypes.string
};

export default connect(mapStateToProps)(Home);
