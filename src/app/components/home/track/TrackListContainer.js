import React, { Component } from "react";
import TrackCardList from "./TrackCardList";
import SearchAPI from "../../../api/search";
import PropTypes from "prop-types";
import _ from "lodash";

class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {},
      isFetchingTracks: true
    };
  }
  componentDidMount() {
    let query = this.generateQuery(this.props);
    this.getTracks(query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery) {
      this.setState({
        isFetchingTracks: true
      });
      let query = this.generateQuery(nextProps);
      this.getTracks(query);
    }
  }

  generateQuery(props) {
    return {
      searchInput: props.searchQuery ? props.searchQuery : "peaky",
      markets: props.market || ""
    };
  }
  getTracks(query) {
    SearchAPI.searchTracks(query).then(response => {
      this.setState({
        isFetchingTracks: false,
        tracks: response.tracks
      });
    });
  }
  render() {
    const { isFetchingTracks, tracks } = this.state;
    const { filters } = this.props;
    return (
      <TrackCardList
        isFetchingTracks={isFetchingTracks}
        popularity={filters.popularity}
        tracks={tracks}
      />
    );
  }
}

TrackListContainer.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filters: PropTypes.object
};

export default TrackListContainer;
