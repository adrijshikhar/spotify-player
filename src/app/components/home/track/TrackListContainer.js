import React, { Component } from "react";
import TrackCardList from "./TrackCardList";
import SearchAPI from "../../../api/search";
import PropTypes from "prop-types";
import _ from "lodash";

class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: { items: [] },
      isFetching: true
    };
  }
  componentDidMount() {
    if (this.props.searchType === "track") {
      let query = this.generateTrackQuery(this.props);
      this.getTracks(query);
    } else {
      let query = this.generateArtistTrackQuery(this.props);
      this.getArtistTracks(query);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery) {
      this.setState({
        isFetching: true
      });
      if (nextProps.searchType === "track") {
        let query = this.generateTrackQuery(nextProps);
        this.getTracks(query);
      } else {
        let query = this.generateArtistTrackQuery(nextProps);
        this.getArtistTracks(query);
      }
    }
  }

  generateTrackQuery(props) {
    return {
      searchInput: props.searchQuery ? props.searchQuery : "peaky",
      markets: props.market || ""
    };
  }
  generateArtistTrackQuery(props) {
    return {
      searchInput: props.searchQuery ? props.searchQuery : "peaky"
    };
  }
  getArtistTracks(query) {
    SearchAPI.searchTracksByArtistName(query).then(response => {
      this.setState({
        isFetching: false,
        tracks: response.artists
      });
    });
  }
  getTracks(query) {
    SearchAPI.searchTracks(query).then(response => {
      this.setState({
        isFetching: false,
        tracks: response.tracks
      });
    });
  }
  render() {
    const { isFetching, tracks } = this.state;
    const { filters, searchType } = this.props;
    if (searchType === "track")
      return (
        <TrackCardList
          isFetching={isFetching}
          popularity={filters.popularity}
          data={tracks}
          searchType={searchType}
        />
      );
    else
      return (
        <TrackCardList
          isFetching={isFetching}
          popularity={filters.popularity}
          data={tracks}
          searchType={searchType}
        />
      );
  }
}

TrackListContainer.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filters: PropTypes.object,
  searchType: PropTypes.string
};

export default TrackListContainer;
