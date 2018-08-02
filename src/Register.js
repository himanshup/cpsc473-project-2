import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import firebase from "./firebaseAuth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      city: "",
      state: "",
      zip: ""
    };
  }

  componentDidMount() {
    document.title = "Register";
    document.body.style =
      "background: url(https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=719292378935d0f9168f11f9ad00558d&auto=format&fit=crop&w=1567&q=80) no-repeat center center fixed; background-size: cover;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      <Container>
        <Row>
          <Col />
          <Col lg="7">
            <Card className="shadow-lg border-0" id="loginCard">
              <h1 className="display-4 text-center example-title">Register</h1>
              <Form id="loginForm">
                <FormGroup>
                  <Label for="exampleInputEmail1">Name</Label>
                  <Input
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="name"
                    name="name"
                    class="form-control"
                    id="newName"
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">Email</Label>
                  <Input
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    class="form-control"
                    id="newEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
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
                    id="newPassword"
                    placeholder="Password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">Street Address</Label>
                  <Input
                    value={this.state.address}
                    onChange={this.handleChange}
                    type="address"
                    name="address"
                    class="form-control"
                    id="newAddress"
                    placeHolder="Enter Street Address"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">City</Label>
                  <Input
                    value={this.state.city}
                    onChange={this.handleChange}
                    type="city"
                    name="city"
                    class="form-control"
                    id="newCity"
                    placeHolder="City"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">State</Label>
                  <Input
                    value={this.state.state}
                    onChange={this.handleChange}
                    type="state"
                    name="state"
                    class="form-control"
                    id="newState"
                    placeHolder="State"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleInputPassword1">Zipcode</Label>
                  <Input
                    value={this.state.zip}
                    onChange={this.handleChange}
                    type="zip"
                    name="zip"
                    class="form-control"
                    id="newZip"
                    placeHolder="Zipcode"
                    required
                  />
                </FormGroup>
                <div className="text-center">
                  <Link to="/register">
                    <Button onClick={this.signup} color="danger">
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
export default Register;
