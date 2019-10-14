import React, { Component } from "react";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //expired jwtToken
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

class App extends Component {
 
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppNavbar />
        </div>
      </Provider>
    );
  }
}

export default App;
