import React, { Component } from "react";
import TrackCardList from "./TrackCardList";
import SearchAPI from "../../../api/search";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import {
  saveSearchResults,
  deleteSearchResults
} from "../../../actions/searchActions";
class TrackListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingTracks: true,
      update: true,
      tracks: []
    };
  }
  componentDidMount() {
    if (!this.props.filters.markets) {
      this.props.filters.markets.map((market, index) => {
        let query = this.generateQuery(this.props, market);
        this.getTracks(query);
      });
    } else {
      let query = this.generateQuery(this.props, undefined);
      this.getTracks(query);
    }
    this.updateFetching(false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.searchQuery !== this.props.searchQuery ||
      !_.isEqual(nextProps.filters, this.props.filters)
    ) {
      this.props.deleteSearchResults();
      this.updateFetching(true);
      let markets = nextProps.filters.markets
        ? nextProps.filters.markets
        : this.props.filters.markets;
      if (!markets)
        nextProps.filters.markets.map((market, index) => {
          let query = this.generateQuery(this.props, market);
          this.getTracks(query);
        });
      else {
        let query = this.generateQuery(this.props, undefined);
        this.getTracks(query);
      }
      this.updateFetching(false);
    }
  }

  updateFetching(update) {
    this.setState({
      isFetchingTracks: update
    });
  }
  refresh(update) {
    this.setState({ update });
  }
  generateQuery(props) {
    return {
      searchInput: props.searchQuery ? props.searchQuery : "peaky",
      markets: props.market || ""
    };
  }
  getTracks(query) {
    SearchAPI.searchTracks(query).then(response => {
      let tracks = response.tracks.items;
      console.log(tracks);
      this.props.saveSearchResults(tracks);
    });
  }
  render() {
    const { isFetchingTracks, update, tracks } = this.state;
    const { filters } = this.props;
    return (
      <TrackCardList
        isFetchingTracks={isFetchingTracks}
        popularity={filters.popularity}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveSearchResults: tracks => {
    dispatch(saveSearchResults(tracks));
  },
  deleteSearchResults: () => {
    dispatch(deleteSearchResults());
  }
});

TrackListContainer.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filters: PropTypes.object,
  saveSearchResults: PropTypes.func,
  deleteSearchResults: PropTypes.func
};

export default connect(null, mapDispatchToProps)(TrackListContainer);
