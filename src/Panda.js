import React, { Component } from "react";
// import {
//   Container,
//   Card,
//   CardText,
//   CardBody,
//   CardTitle,
//   Button,
//   Row,
//   Col,
//   CustomInput,
//   Form,
//   FormGroup,
//   Label
// } from "reactstrap";
import "./Order.css";
import db from "./firebase";

class Panda extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Panda Express";

    this.menu = db
      .collection("restaurants/restaurant2/menu")
      .onSnapshot(collection => {
        const items = collection.docs.map(doc => doc.data());
        this.setState({ items });
      });
  }

  componentWillUnmount() {
    this.menu();
  }

  render() {
    return (
      <div>
        <h1 className="display-4 text-center restaurant-title">Panda Express</h1>
      </div>
    );
  }
}

export default Panda;
