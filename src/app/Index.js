import React from "react";
import { render } from "react-dom";

import App from "./components/App";

import * as OfflinePluginRuntime from "offline-plugin/runtime";
OfflinePluginRuntime.install();
render(<App />, document.getElementById("app"));
