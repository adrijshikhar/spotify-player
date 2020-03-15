import React from "react";
import { PropTypes } from "prop-types";
import defaultImg from "../../../images/default.png";
function TrackCardView(props) {
  return (
    <div className="card-container">
      <div className="card-content-container">
        <div className="card-image-container">
          <img className="card-image" src={props.image[0].url} />
        </div>
        <div className="card-content">
          <div className="card-content-heading">{props.name}</div>
          {props.subheadings.map((sub, index2) => (
            <div className="card-content-subheading" key={index2}>
              {sub.name || sub}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

TrackCardView.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.array,
  subheadings: PropTypes.array
};

export default TrackCardView;
