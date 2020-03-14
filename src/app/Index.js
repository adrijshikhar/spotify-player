import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store.js";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import throttle from "lodash/throttle";
import { loadState, saveState } from "./cookie";
OfflinePluginRuntime.install();

const store = configureStore(loadState());

store.subscribe(
  throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000)
);
store.subscribe(() => {
  console.log("store updated",store.getState());
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
