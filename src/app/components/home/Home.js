import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Auth from "../auth/";
import SearchAPI from "../../api/search";
class Home extends Component {
  componentDidMount() {
    SearchAPI.searchTracks("love").then(response => {
      console.log(response);
    });
  }
  render() {
    return (
      <div>
        {!this.props.access_token ? (
          <div>
            hi <a href="http://localhost:8888/login"> Login to Spotify </a>
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
