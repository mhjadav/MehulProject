import React, { Component } from "react";
import PropTypes from "prop-types";
// import "preact/devtools";
import { path } from "./Utils";
import { Nav } from 'reactstrap';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Add from "./Add";
import View from "./View";

class App extends Component {

  componentDidUpdate(prevProps) {
    const isNotSameRoute = path(["props", "location", "pathname"], this) !== path(["location", "pathname"], prevProps);
    if (isNotSameRoute) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Payment Details</h1>
        </header>
          <Router>
            <div>
              <Nav>
                <Link to="/view" Style="margin-right:5px;">View All</Link>|
                <Link to="/add" Style="margin-left:5px;">Add New</Link>              
              </Nav>
              <hr />            
              <Route exact path="/" component={View}/>
              <Route path="/view" component={View}/>
              <Route path="/edit/:key" component={Add}/>
              <Route path="/add" component={Add}/>
            </div>
          </Router>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    query: PropTypes.object,
  }),
  children: PropTypes.node,
  location: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  checkUserLogin: PropTypes.func,
};

App.defaultProps = {
  children: null,
  location: null,
  user: {
    id: "",
    password: "",
    error: "",
    pathname: "/login",
    search: "",
    query: {}
  },
  checkUserLogin: () => {},
};
export default App;
