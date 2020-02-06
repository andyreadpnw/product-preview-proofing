import React from "react";
import { api } from "./services/api";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fields: {
        username: "",
        password: ""
      },
      loginError: false
    };
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault();
    api.auth.login(this.state.fields).then(res => {
      console.log(res.message);
      if (res.message === "Invalid username or password") {
        this.setState({
          loginError: true
        });
      } else if (!res.error) {
        this.setState({
          loginError: false
        });
        this.props.onLogin(res);

        console.log(this.state.error);
      } else {
        this.setState({ error: true });
      }
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        {this.state.error ? <h1>Connection Unsucessful</h1> : null}
        {this.state.loginError ? (
          <h1>Username or Password was incorrect</h1>
        ) : null}
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h1>Product Preview</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className="ui field">
                    <label>Username</label>
                    <input
                      name="username"
                      placeholder="username"
                      value={fields.username}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ui field">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                      value={fields.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button type="submit" className="ui basic green button">
                    Login
                  </button>
                  <div>
                    <a>The username/passwords for demo purposes:</a>{" "}
                    <a>username:Admin, password: pass</a>
                    <br></br>
                    <a>username: andy.read, password: pass</a>
                    <br></br>
                    <a>username: random.plm, password: pass</a>
                    <br></br>
                    <a>username: random.merchant, password: pass</a>
                    <br></br>
                    <a>username: random.planner, password: pass</a>
                    <br></br>
                    <a>username: random.other, password: pass</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Login;
