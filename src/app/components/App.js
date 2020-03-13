import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Test from "./test/";
import "../styles/main.scss";
import * as auth from "../auth/auth.js";

class Index extends React.Component {
  constructor(params) {
    super();
    this.state = { authToken: null };
  }
  componentDidMount() {
    this.fetchAPIDetails();
  }

  fetchAPIDetails = () => {
    // Set token
    let auth_token = auth.hash.access_token;
    if (auth_token) {
      // Set token
      this.setState({
        authToken: auth_token
      });
    }
  };

  render() {
    const { authToken } = this.state;
    console.log(authToken);
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/test" component={Test} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Index;
