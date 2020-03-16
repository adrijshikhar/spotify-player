import React, { Component } from "react";
import TrackCardList from "./TrackCardList";
import SearchAPI from "../../../api/search";
import PropTypes from "prop-types";
import _ from "lodash";

class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { items: [] },
      isFetching: true
    };
  }
  componentDidMount() {
    let query = this.generateQuery(this.props);
    if (this.props.searchType === "track") {
      this.getTracks(query);
    } else if (this.props.searchType === "artist") {
      this.getArtists(query);
    } else {
      this.getTracksByArtist(query);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery) {
      this.setState({
        isFetching: true
      });
      let query = this.generateQuery(nextProps);
      if (nextProps.searchType === "track") {
        this.getTracks(query);
      } else if (nextProps.searchType === "artist") {
        this.getArtists(query);
      } else {
        let query = this.generateQuery(nextProps);
        this.getTracksByArtist(query);
      }
    }
  }

  generateQuery(props) {
    return {
      searchInput: props.searchQuery ? props.searchQuery : "peaky",
      markets: props.market || "",
      offset: props.offset
    };
  }

  getArtists(query) {
    SearchAPI.searchArtists(query).then(response => {
      this.setState({
        isFetching: false,
        data: response.artists
      });
    });
  }
  getTracks(query) {
    SearchAPI.searchTracks(query).then(response => {
      this.setState({
        isFetching: false,
        data: response.tracks
      });
    });
  }
  getTracksByArtist(query) {
    SearchAPI.searchTracksByArtist(query).then(response => {
      this.setState({
        isFetching: false,
        data: response.tracks
      });
    });
  }
  render() {
    const { isFetching, data } = this.state;
    const { filters, searchType } = this.props;
    return (
      <TrackCardList
        isFetching={isFetching}
        popularity={filters.popularity}
        data={data}
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
