import React, { Component } from "react";
import { PropTypes } from "prop-types";

class Player extends Component {
  render() {
    return (
      <div className="track-player-container">
        <audio
          className="track-player"
          controls
          autoPlay
          src={this.props.track.preview_url}
        />
      </div>
    );
  }
}
Player.propTypes = {
  track: PropTypes.string
};
export default Player;
