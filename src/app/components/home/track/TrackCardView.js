import React from "react";
import { PropTypes } from "prop-types";
import defaultImg from "../../../images/default.png";
function TrackCardView(props) {
  console.log(props);
  return (
    <div className="card-container">
      <div className="card-content-container">
        <div className="card-image-container">
          <img className="card-image" src={defaultImg} />
        </div>
        <div className="card-content">
          <div className="card-content-heading">{props.name}</div>
          {props.artists.map((artist, index2) => (
            <div className="card-content-subheading" key={index2}>
              {artist.name}
            </div>
          ))}
          {/* <div className="card-content-subheading">{props.artists[0].name}</div> */}
        </div>
      </div>
    </div>
  );
}

TrackCardView.propTypes = {};

export default TrackCardView;
