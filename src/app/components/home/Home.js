import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchAPI from "../../api/search";
import TrackListContainer from "./track/TrackListContainer";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }

  searchTrack = e => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div className="home-container">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            onChange={e => this.searchTrack(e)}
          />
        </div>
        <div className="search-result-container">
          <TrackListContainer searchQuery={searchQuery} />
        </div>
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
