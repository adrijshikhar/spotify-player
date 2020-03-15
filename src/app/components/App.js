import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth";
import Login from "./login/Login";
import Test from "./test/";
import "../styles/main.scss";
import Error404 from "./error404";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class App extends React.Component {
  render() {
    const RootComponent = () =>
      this.props.access_token ? <Home /> : <Login />;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={RootComponent} />
          <Route path="/auth" component={Auth} />
          <Route exact path="/test" component={Test} />
          <Route path="*" component={Error404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  refresh_token: state.auth.refresh_token
});

App.propTypes = {
  access_token: PropTypes.string,
  refresh_token: PropTypes.string
};

export default connect(mapStateToProps)(App);
