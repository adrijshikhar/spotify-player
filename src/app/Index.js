import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store.js";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

OfflinePluginRuntime.install();
const store = configureStore();

store.subscribe(() => {
  console.warn("store updated", store.getState());
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
