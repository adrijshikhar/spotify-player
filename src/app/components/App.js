import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth";
import Test from "./test/";
import "../styles/main.scss";
import Error404 from "./error404";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route exact path="/test" component={Test} />
          <Route exact path="*" component={Error404} />
        </Switch>
      </div>
    );
  }
}

export default App;
