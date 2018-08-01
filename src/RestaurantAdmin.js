import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";
import "./Order.css";
import db from "./firebase";

class RestaurantAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      calories: "",
      open: true
    };
  }

  componentDidMount() {
    document.title = "Admin Page";
  }

  componentWillUnmount() {}

  handleFormChange(e) {
    this.setState(
      { [e.target.name]: e.target.value },
      this.showState.bind(this, this.props)
    );
  }

  updateStatus = e => {
    e.preventDefault();
    db.doc("restaurants/restaurant1").update({
      open: !this.state.open
    });
  };

  updateStatus2 = e => {
    e.preventDefault();
    db.doc("restaurants/restaurant1").update({
      open: this.state.open
    });
  };

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="text-center">Restaurant Admin Page</h1>
            <h3 className="">Add Menu Item</h3>
            <h3 className="">Close/Open Restaurant</h3>
            <Button color="primary" onClick={this.updateStatus2}>
              Open
            </Button>{" "}
            <Button color="primary" onClick={this.updateStatus}>
              Close
            </Button>{" "}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default RestaurantAdmin;
