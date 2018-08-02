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
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import firebase from "./firebaseAuth";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
      email: "",
      password: ""
    };
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  toggle2() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    document.title = "Welcome";
    document.body.style =
      "background: url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=719292378935d0f9168f11f9ad00558d&auto=format&fit=crop&w=1567&q=80) no-repeat center center fixed; background-size: cover;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  logout() {
    firebase.auth().signOut();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
      });
    this.setState({
      email: "",
      password: ""
    });
  }

  signup(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      email: "",
      password: ""
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle2}>
          <ModalHeader toggle={this.toggle2}>Login</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleInputEmail1">Email</Label>
                <Input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleInputPassword1">Password</Label>
                <Input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Link to="/">
              <Button type="submit" onClick={this.login} color="danger">
                Sign In
              </Button>{" "}
            </Link>
            <Button color="secondary" onClick={this.toggle2}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Navbar dark expand="md" className="shadow">
          <Container>
            <Link to="/" className="navbar-brand">
              Foodhub
            </Link>
            <NavbarToggler onClick={this.toggle2} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Sign Up
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/driversignup" className="dropdown-item">
                        Driver Sign Up
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/restaurantsignup" className="dropdown-item">
                        Restaurant Sign Up
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <Button
                    outline
                    color="light"
                    className="navBtns"
                    onClick={this.toggle2}
                  >
                    Sign In
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
