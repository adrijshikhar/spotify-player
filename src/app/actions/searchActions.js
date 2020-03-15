export function saveSearchResults(tracks) {
  return {
    type: "TRACKS",
    payload: tracks
  };
}

export function deleteSearchResults() {
  return {
    type: "DELETE_SEARCH_RESULTS"
  };
}
