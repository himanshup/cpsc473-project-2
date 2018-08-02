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

class Resturant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localContactName: "",
      localContactPhone: "",
      localContactEmail: "",
      resturantName: "",
      resturantAddress: "",
      foodType: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "Restaurant Sign Up";
    document.body.style = "background: #f7f7f7;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  handleSubmit(event) {
    event.preventDefault();
    const newMessage = {
      localContactName: this.state.localContactName,
      localContactPhone: this.state.localContactPhone,
      localContactEmail: this.state.localContactEmail,
      resturantName: this.state.resturantName,
      resturantAddress: this.state.resturantAddress,
      foodType: this.state.foodType,
      status: "Needs Review",
      submissionTimeStamp: new Date().toString()
    };
    console.log(newMessage);
    alert(
      "Thank you for your submission. We will review your application as soon as we can!"
    );
    event.target.reset();
    db.collection("resturantRequest").add(newMessage);
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
          <h1 className="text-center restaurant-title">Restaurant Sign Up</h1>
          <Form id="loginForm" onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="cname" sm={2}>
                Contact Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="localContactName"
                  id="cname"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cphone" sm={2}>
                Contact Phone:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="localContactPhone"
                  id="cphone"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cemail" sm={2}>
                Contact Email:
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="localContactEmail"
                  id="cemail"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rname" sm={2}>
                Resturant Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="resturantName"
                  id="rname"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="raddress" sm={2}>
                Resturant Address:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="resturantAddress"
                  id="raddress"
                  onChange={this.handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rtype" sm={2}>
                Food Type:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="foodType"
                  id="rtype"
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

export default Resturant;
