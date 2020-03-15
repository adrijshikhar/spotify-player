import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Preloader from "../../../utils/Preloader";
import TrackCardView from "./TrackCardView";
class TrackCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subheadings:
        this.props.searchType === "track"
          ? props.data.artists
          : props.data.genres
    };
  }

  render() {
    let { data, isFetchingTracks, popularity, searchType } = this.props;
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
            image={data.images ? data.images : [{ url: "" }]}
            data={data}
            subheadings={data.artists || data.genres}
            searchType={searchType}
          />
        );
    });
    return <div className="tracks-card-container">{tracksList}</div>;
  }
}
TrackCardList.propTypes = {
  data: PropTypes.object,
  searchType: PropTypes.object,
  isFetchingTracks: PropTypes.bool,
  popularity: PropTypes.object
};
export default TrackCardList;
