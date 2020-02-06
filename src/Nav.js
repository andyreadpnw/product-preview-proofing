import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { api } from "./services/api";

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      allTicketsClicked: false,
      username: "login",
      user_group_id: null
    };
    this.enterTickets = this.enterTickets.bind(this);
  }

  componentDidMount() {
    api.auth.getCurrentUser().then(user => {
      this.setState({
        username: user.user_id.username,
        user_group_id: user.user_id.user_group_id
      });
    });
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  enterTickets() {
    this.setState({
      allTicketsClicked: !this.state.allTicketsClicked
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable color="info">
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/home">Product Preview</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="/tickets/"
                  enterTickets={this.enterTickets}
                  allTicketsClicked={this.state.allTicketsClicked}
                >
                  Product Tickets
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/userprofile/">
                  Welcome {this.state.username}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/andyreadpnw">Github</NavLink>
              </NavItem>
              <NavLink href="/login/" onClick={() => this.props.logout()}>
                Sign Out
              </NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
