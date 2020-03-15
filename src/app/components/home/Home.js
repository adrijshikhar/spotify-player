import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TrackListContainer from "./track/TrackListContainer";
import { Markets } from "../../constants/markets";
import { Popularity } from "../../constants/popularity";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "peaky",
      markets: "",
      popularity: Popularity[0],
      searchType: "track",
      offset: 0
    };
  }

  search = e => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value,
      searchType: e.target.name
    });
  };
  setOffset = e => {
    e.preventDefault();
    let change = 0;
    if (e.target.name === "prev" && this.state.offset > 0) change = -20;
    else if (e.target.name === "next") change = 20;
    this.setState({
      offset: this.state.offset + change
    });
  };
  filterSearchHandler = e => {
    e.preventDefault();
    let formData = new FormData(this.filterSearch);
    let form_data_popularity = parseInt(formData.get("popularity"));

    let popularity;
    for (let index = 0; index < Popularity.length; index++) {
      const element = Popularity[index];
      if (element.valueMin === form_data_popularity) {
        popularity = element;
        break;
      }
    }
    this.setState({
      markets: formData.get("market") || undefined,
      popularity
    });
  };
  render() {
    const { searchQuery, markets, popularity, searchType, offset } = this.state;
    const filters = { markets: Object.values(markets), popularity };
    return (
      <div className="home-container">
        <button
          className="prev-page"
          name="prev"
          onClick={e => this.setOffset(e)}
        >
          &lt; Previous page
        </button>
        <button
          className="next-page"
          name="next"
          onClick={e => this.setOffset(e)}
        >
          Next page &gt;
        </button>
        <div className="search-bar-container">
          <input
            type="text"
            name="track"
            className="search-bar"
            placeholder="search tracks"
            onChange={e => this.search(e)}
          />
          <input
            type="text"
            name="artist"
            className="search-bar"
            placeholder="search tracks by artist name"
            onChange={e => this.search(e)}
          />
        </div>
        <form
          className="filter-search-form"
          ref={el => (this.filterSearch = el)}
          onSubmit={e => this.filterSearchHandler(e)}
        >
          <div className="filter-container">
            <div className="filter-market">
              {Markets.map((market, index) => {
                let defaultChecked = false;
                if (index === 0) {
                  defaultChecked = true;
                }
                return (
                  <label htmlFor={market} key={index}>
                    <input
                      defaultChecked={defaultChecked}
                      type="radio"
                      name="market"
                      value={market}
                      id={market}
                    />
                    {market}
                  </label>
                );
              })}
            </div>
            <label htmlFor="popularity">Popularity</label>
            <select id="popularity" name="popularity">
              {Popularity.map((popularity, index) => {
                return (
                  <option key={index} value={popularity.valueMin}>
                    {popularity.key}
                  </option>
                );
              })}
            </select>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <div className="search-result-container">
          <TrackListContainer
            searchQuery={searchQuery}
            filters={filters}
            searchType={searchType}
            offset={offset}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  refresh_token: state.auth.refresh_token
});

Home.propTypes = {
  access_token: PropTypes.string,
  refresh_token: PropTypes.string
};

export default connect(mapStateToProps)(Home);
