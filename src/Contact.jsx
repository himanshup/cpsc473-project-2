import React, { Component } from "react";
import db from "./firebase";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Card
} from "reactstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Feedback",
      fullName: "",
      email: "",
      message: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Contact Us";
    document.body.style = "background: #f7f7f7;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(
      "Thank you for your submission. We will review your " +
        this.state.type.toLowerCase() +
        " as soon as we can!"
    );
    const newMessage = {
      type: this.state.type,
      name: this.state.fullName,
      email: this.state.email,
      message: this.state.message,
      timestamp: new Date().toString()
    };
    //console.log(newMessage);
    event.target.reset();
    db.collection("messages").add(newMessage);
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
          <h1 className="restaurant-title text-center">Contact Us</h1>
          <Form id="loginForm">
            <FormGroup>
              <legend className="col-form-label">Feedback or Problem?</legend>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="type"
                    value="Feedback"
                    checked={this.state.type === "Feedback"}
                    onChange={this.handleInputChange}
                  />{" "}
                  Feedback
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="type"
                    value="Problem"
                    checked={this.state.type === "Problem"}
                    onChange={this.handleInputChange}
                  />{" "}
                  Problem
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
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
              <Label for="message" sm={2}>
                {this.state.type}:
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Please be as detailed as possible, don't hold back"
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

export default Contact;
