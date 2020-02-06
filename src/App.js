import React, { Component } from "react";
import "./App.css";
import TopNav from "./Nav";
import MainArea from "./MainArea";
import Login from "./Login";
import Tickets from "./Tickets";
import Profile from "./Profile";
import { api } from "./services/api";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: {
        user: {
          user_id: { id: null, username: null }
        }
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      // make a request to the backend and find user
      api.auth.getCurrentUser().then(user => {
        console.log(user);
        const updatedState = { ...this.state.auth, user: user };
        this.setState({ auth: updatedState });
      });
    }
  }

  login = data => {
    console.log(data.user.username);
    const updatedState = { ...this.state.auth, user: data };
    localStorage.setItem("token", data.jwt);
    this.setState({ auth: updatedState }, () => {
      window.location.href =
        "https://andyreadpnw.github.io/product-preview/home";
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: { user: {} } });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <App />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route
            path="/login"
            render={props => <Login {...props} onLogin={this.login} />}
          />
          <Route
            exact
            path="/home"
            render={props => (
              <div>
                <TopNav logout={this.logout} />
                <MainArea currentUser={this.state.auth.user} />
              </div>
            )}
          />
          <Route
            path="/userprofile"
            render={props => (
              <div>
                <TopNav logout={this.logout} />
                <Profile {...props} currentUser={this.state.auth} />
              </div>
            )}
          />
          <Route
            path="/tickets"
            render={props => (
              <div>
                <TopNav logout={this.logout} />
                <Tickets {...props} currentUser={this.state.auth} />
              </div>
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
