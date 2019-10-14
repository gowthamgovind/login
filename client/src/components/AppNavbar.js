import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ListUsersComponent from "./ListUsersComponent";
import DashboardComponent from "./DashboardComponent";
import LoginComponent from "./LoginComponent";
import NotFoundComponent from "./NotFoundComponent";
import OtpVerificationComponent from "./OtpVerificationComponent"
import SignupComponent from "./SignupComponent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import "../../node_modules/jquery/dist/jquery.min.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

class AppNavbar extends Component {
  constructor(props) {
    super();
  }
 

  onlogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user, isAdmin } = this.props.auth;    
    const authLinks = (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark text-white fixed-top">
        <Link className="navbar-brand" to={"/"}>
          BRAND - NAME
        </Link>
        <button
          className="navbar-toggler navbar-toggle collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" className="navbar-collapse collapse">
          {isAdmin ? (
            <div>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    onClick={this.onlogoutClick.bind(this)}
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="navbar-nav ml-auto">
           
              <li className="nav-item navbar-left">
                <Link
                  to="/"
                  onClick={this.onlogoutClick.bind(this)}
                  className="nav-link"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );

    const guestLinks = (
      <div>      
        <Link to={"/"} className="navbar-brand text-white"></Link>
      <Link to={"/signup"} className="navbar-brand text-white"></Link>
      </div>
    );
    
    return (
      <Router>
        {isAuthenticated ? authLinks : guestLinks}
        <br />
        <br />
        <div className="container" style={{ marginTop: 50 }}>
          {isAuthenticated ? (
            <div>
              {isAdmin ? (
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={DashboardComponent}
                  />
                  <Route exact path="/users" component={ListUsersComponent} />

                  <Route path="*" component={NotFoundComponent} />
                </Switch>
              ) : (
                <Switch>
                    <Route
                      exact
                      path="/"
                      component={DashboardComponent}
                    />
                    
                  <Route path="*" component={NotFoundComponent} />
                </Switch>
              )}
            </div>
          ) : (
            <Switch>
              <Route exact path="/" component={LoginComponent} />
              <Route exact path="/signup" component={SignupComponent} />
              <Route exact path="/otpverify" component={OtpVerificationComponent} />
              <Redirect to={"/"} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}
AppNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavbar);
