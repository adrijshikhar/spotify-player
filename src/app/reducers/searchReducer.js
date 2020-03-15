/* eslint-disable no-param-reassign */
const searchReducer = (state = { tracks: [] }, action) => {
  let tracks = action.payload;
  switch (action.type) {
    case "TRACKS":
      state = {
        ...state,
        tracks: [...state.tracks, ...tracks]
      };
      break;
    case "DELETE_SEARCH_RESULTS":
      state.tracks = [];
      break;
  }
  return state;
};

export default searchReducer;
