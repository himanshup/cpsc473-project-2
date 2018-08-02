import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import firebase from "./firebaseAuth";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase.auth().signOut();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar dark expand="md" className="shadow">
          <Container>
            <Link to="/" className="navbar-brand">
              Foodhub
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/feedback" className="dropdown-item">
                        Feedback
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/problem" className="dropdown-item">
                        Problems
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/signup" className="dropdown-item">
                        Sign Up Requests
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to="/orders" className="dropdown-item">
                        Orders
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/restaurantscreen" className="dropdown-item">
                        Restaurant
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/driver" className="dropdown-item">
                        Driver
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/restaurantadmin" className="dropdown-item">
                        Edit
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <Link to="/">
                    <Button
                      color="dark"
                      className="navBtns"
                      onClick={this.logout}
                    >
                      Sign Out
                    </Button>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
