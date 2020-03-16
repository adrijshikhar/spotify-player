import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Preloader from "../../../utils/Preloader";
import defaultImg from "../../../images/default.png";
import TrackCardView from "./TrackCardView";

import Player from "./Player";

class TrackCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subheadings:
        this.props.searchType === "track"
          ? props.data.artists
          : props.data.genres,
      previewPlayer: "",
      card: 0
    };
  }
  playPreviewTack = (isFetchingTrackPreview, track) => {
    this.setState({
      previewPlayer: (
        <Player isFetchingTrackPreview={isFetchingTrackPreview} track={track} />
      )
    });
  };
  switchView = () => {
    this.setState({
      card: !this.state.card
    });
  };
  render() {
    let { data, isFetchingTracks, popularity, searchType } = this.props;
    let { previewPlayer, card } = this.state;
    if (isFetchingTracks) {
      return <Preloader size={4} />;
    }
    let tracksList = [];

    tracksList = data.items.map((data, index) => {
      if (
        (popularity.valueMin <= data.popularity &&
          data.popularity <= popularity.valueMax) ||
        popularity.valueMin === 0
      )
        return (
          <TrackCardView
            key={index}
            name={data.name}
            id={data.id}
            image={
              data.images !== undefined && data.images.length !== 0
                ? data.images
                : [{ url: defaultImg }]
            }
            data={data}
            subheadings={data.artists || data.genres}
            searchType={searchType}
            playPreviewTack={this.playPreviewTack}
          />
        );
    });
    return (
      <div className={`tracks-${card ? "card" : "list"}-container`}>
        <button
          className="view-switch-button"
          onClick={() => this.switchView()}
        >
          grid or list
        </button>
        {tracksList}
        {previewPlayer}
      </div>
    );
  }
}
TrackCardList.propTypes = {
  data: PropTypes.object,
  searchType: PropTypes.string,
  isFetchingTracks: PropTypes.bool,
  popularity: PropTypes.object
};
export default TrackCardList;
