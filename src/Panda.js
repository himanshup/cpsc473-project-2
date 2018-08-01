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
    this.state = {
      restaurantName: "",
      restaurantAddress: ""
    };
  }

  componentDidMount() {
    document.title = "Panda Express";

    this.menu = db
      .collection("restaurants/restaurant2/menu")
      .onSnapshot(collection => {
        const items = collection.docs.map(doc => doc.data());
        this.setState({ items });
      });
    db.doc("restaurants/restaurant2")
      .get()
      .then(doc =>
        this.setState({
          restaurantName: doc.data().name,
          restaurantAddress: doc.data().address
        })
      );
  }

  componentWillUnmount() {
    this.menu();
  }

  render() {
    return (
      <div>
        <h1 className="text-center restaurant-title">
          {this.state.restaurantName} ({this.state.restaurantAddress})
        </h1>
      </div>
    );
  }
}

export default Panda;
