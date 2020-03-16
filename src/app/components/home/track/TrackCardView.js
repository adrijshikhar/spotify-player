import React, { Component } from "react";
import { PropTypes } from "prop-types";
import SearchAPI from "../../../api/search";
import playIcon from "../../../images/play.png";
class TrackCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      isFetchingTrackPreview: true
    };
  }

  componentDidMount() {
    if (this.props.searchType === "track") {
      let trackID = { id: this.props.id };
      SearchAPI.getTrackPreview(trackID).then(response => {
        this.setState({
          isFetchingSongPreview: false,
          track: response
        });
      });
    }
  }
  playPreviewTack = () => {
    this.props.playPreviewTack(
      this.state.isFetchingTrackPreview,
      this.state.track
    );
  };

  render() {
    const { image, name, subheadings, searchType } = this.props;
    const { track } = this.state;
    return (
      <div className="card-container">
        <div className="card-content-container">
          <div className="card-image-container">
            <img className="card-image" src={image[0].url} />
          </div>
          <div className="card-content">
            <div className="card-content-heading">{name}</div>
            {subheadings.map((sub, index2) => (
              <div className="card-content-subheading" key={index2}>
                {sub.name || sub}
              </div>
            ))}
            {(searchType === "track" || searchType === "trackArtist") &&
            track.preview_url ? (
              <div className="card-player" onClick={this.playPreviewTack}>
                <img src={playIcon} className="card-play-icon" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

TrackCardView.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.array,
  subheadings: PropTypes.array,
  searchType: PropTypes.string,
  playPreviewTack: PropTypes.func
};

export default TrackCardView;
