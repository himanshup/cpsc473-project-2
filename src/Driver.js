import React, { Component } from "react";
import { Container, Card, CardText, CardBody, CardTitle } from "reactstrap";
import "./Order.css";
import db from "./firebase";

class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverViewAvailable: true
    };
  }

  componentDidMount() {
    document.title = "Driver Screen";

    db.doc("orders/settings")
      .get()
      .then(document => {
        if (document.exists) {
          this.setState({ orderNumber: document.data().orderID });
        }
      });

    this.unRegisterDriverAvailable = db
      .collection("orders")
      .where("driver", "==", "-unassigned-")
      .onSnapshot(collection => {
        const driverAvailableOrders = collection.docs.map(doc => doc.data());
        this.setState({ driverAvailableOrders });
      });
    this.unRegisterDriver = db
      .collection("orders")
      .where("driver", "==", "Bob")
      .where("status", ">", "Complete")
      .onSnapshot(collection => {
        const driverOrders = collection.docs.map(doc => doc.data());
        this.setState({ driverOrders });
      });
  }

  componentWillUnmount() {
    this.unRegisterDriver();
    this.unRegisterDriverAvailable();
  }

  handleDriverAccept(orderNumber) {
    this.setState({ driverViewAvailable: false });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ driver: "Bob" });
  }
  handleDriverPickUp(orderNumber) {
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({
        status: "Picked Up, being delivered",
        timePickedUp: new Date().toString()
      });
  }

  handleDriverDelivered(orderNumber) {
    this.setState({ driverViewAvailable: true });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ status: "Complete", timeDelivered: new Date().toString() });
  }

  renderDriverScreen() {
    if (this.state.driverViewAvailable) {
      return (
        <div>
          <h1 className="text-center">Open Requests</h1>
          <ul>
            {this.state.driverAvailableOrders &&
              this.state.driverAvailableOrders.map((topic, index) => (
                <li key={index}>
                  <button
                    onClick={e => this.handleDriverAccept(topic.orderNumber)}
                  >
                    Accept
                  </button>
                  <br />
                  Pickup Location:<br />
                  {topic.resturant}
                  <br />
                  {topic.resturantAddress}
                  <br />
                  <br />
                  Drop Off Address:<br />
                  {topic.userAddress}
                </li>
              ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <h4 className="text-center">Current Order</h4>
          <ul>
            {this.state.driverOrders &&
              this.state.driverOrders.map((topic, index) => (
                <li key={index}>
                  <button
                    onClick={e => this.handleDriverPickUp(topic.orderNumber)}
                  >
                    Driver pick up
                  </button>
                  <button
                    onClick={e => this.handleDriverDelivered(topic.orderNumber)}
                  >
                    Delivered
                  </button>
                  <br />
                  Pickup Location:<br />
                  {topic.resturant}
                  <br />
                  {topic.resturantAddress}
                  <br />
                  <br />
                  Drop Off Address:<br />
                  Customer: {topic.username}
                  <br />
                  {topic.userAddress}
                  <br />
                  <br />
                  Order Number:{topic.orderNumber}
                  <br />
                  {topic.resturant} <br />
                  {topic.orderItems}
                  <br />
                  <br />
                </li>
              ))}
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <CardText>{this.renderDriverScreen()}</CardText>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Driver;
