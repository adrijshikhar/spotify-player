import React, { Component } from "react";
import TrackCardList from "./TrackCardList";
import SearchAPI from "../../../api/search";
import PropTypes from "prop-types";
class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: {},
      isFetchingTracks: true
    };
  }
  componentDidMount() {
    let query = this.props.searchQuery ? this.props.searchQuery : "peaky";
    this.getTracks(query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.searchQuery) {
      this.setState({
        isFetchingTracks: true
      });
      this.getTracks(nextProps.searchQuery);
    }
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
    return (
      <TrackCardList isFetchingTracks={isFetchingTracks} tracks={tracks} />
    );
  }
}
TrackListContainer.propTypes = {
  searchQuery: PropTypes.string.isRequired
};

export default TrackListContainer;
