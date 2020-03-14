import React from "react";
import PropTypes from "prop-types";

function Preloader(props) {
  const { size } = props;
  return (
    <div
      id="loader"
      className="loader"
      // style={{ height: `${12 * size}px`, width: `${12 * size}px` }}
    />
  );
}

Preloader.propTypes = {
  size: PropTypes.number.isRequired
};

export default Preloader;
