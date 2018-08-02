import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebaseAuth";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card,
  Col,
  Row
} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    document.title = "Login";
    document.body.style =
      "background: url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=719292378935d0f9168f11f9ad00558d&auto=format&fit=crop&w=1567&q=80) no-repeat center center fixed; background-size: cover;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
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
  }

  render() {
    return (
      <Container id="loginCard">
        <Row>
          <Col />
          <Col lg="7">
            <Card className="shadow-lg border-0" id="loginCard">
              <h1 className="display-4 text-center example-title">
                Login to start ordering.
              </h1>
              <Form id="loginForm">
                <FormGroup>
                  <Label for="exampleInputEmail1">Email</Label>
                  <Input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    class="form-control"
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
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="text-center">
                  <Link to="/">
                    <Button type="submit" onClick={this.login} color="danger">
                      Sign In
                    </Button>{" "}
                  </Link>
                  <Link to="/register">
                    <Button onClick={this.handleChange} color="dark">
                      Register
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}
export default Login;
