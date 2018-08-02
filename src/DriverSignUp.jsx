import React, { Component } from "react";
import db from "./firebase";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Card
} from "reactstrap";

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      address: "",
      email: "",
      car: "",
      reason: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Driver Sign Up";
    document.body.style = "background: #f7f7f7;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMessage = {
      name: this.state.fullName,
      address: this.state.address,
      email: this.state.email,
      car: this.state.car,
      reason: this.state.reason,
      status: "Needs Review",
      submissionTimeStamp: new Date().toString()
    };
    console.log(newMessage);
    alert(
      "Thank you for your submission. We will review your application as soon as we can!"
    );
    event.target.reset();
    db.collection("driverRequest").add(newMessage);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Container>
        <Card className="shadow border-0">
          <h1 className="text-center restaurant-title">Driver Sign Up</h1>
          <Form id="loginForm" onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="fullName"
                  id="name"
                  placeholder="Please tell us your name"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="address" sm={2}>
                Address:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="What is your address? (We won't share it)"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={2}>
                Email:
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="So we can reach back out to you"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="car" sm={2}>
                Car:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="car"
                  id="var"
                  placeholder="What kind of car do you drive?"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" sm={2}>
                Reason:
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="reason"
                  id="message"
                  placeholder="Why are you interested in delivering food?"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="danger">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default Driver;
