import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Preloader from "../../../utils/Preloader";
import TrackCardView from "./TrackCardView";
class TrackCardList extends Component {
  render() {
    let { tracks, isFetchingTracks, popularity } = this.props;
    if (isFetchingTracks) {
      return <Preloader size={4} />;
    }
    let tracksList = [];
    tracksList = tracks.items.map((track, index) => {
      if (
        (popularity.valueMin <= track.popularity &&
          track.popularity <= popularity.valueMax) ||
        popularity.valueMin === 0
      )
        return (
          <TrackCardView
            key={index}
            name={track.name}
            artists={track.artists}
            track={track}
          />
        );
    });
    return <div className="tracks-card-container">{tracksList}</div>;
  }
}
TrackCardList.propTypes = {
  tracks: PropTypes.object,
  isFetchingTracks: PropTypes.bool,
  popularity: PropTypes.object
};
export default TrackCardList;
