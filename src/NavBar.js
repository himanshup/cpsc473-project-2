import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
              title
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/restaurantscreen" className="nav-link">
                    Restaurant
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/driver" className="nav-link">
                    Driver
                  </Link>
                </NavItem>
                <NavItem>
                  <Button outline color="light" className="navBtns">
                    Sign In
                  </Button>
                </NavItem>
                <NavItem>
                  <Button color="dark" className="navBtns">
                    Register
                  </Button>
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
