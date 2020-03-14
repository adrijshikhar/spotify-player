const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "ACCESS_TOKEN":
      state = {
        ...state,
        access_token: action.payload
      };
      break;
    case "REFRESH_TOKEN":
      state = {
        ...state,
        refresh_token: action.payload
      };
      break;
  }
  return state;
};

export default authReducer;
