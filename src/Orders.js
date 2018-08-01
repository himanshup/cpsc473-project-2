import React, { Component } from "react";
import { Container, Card, CardText, CardBody, CardTitle } from "reactstrap";
import "./Order.css";
import db from "./firebase";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Orders";

    db.doc("orders/settings")
      .get()
      .then(document => {
        if (document.exists) {
          this.setState({ orderNumber: document.data().orderID });
        }
      });

    this.unRegisterUserCurrentOrders = db
      .collection("orders")
      .where("username", "==", "harold")
      .where("status", ">", "Complete")
      .onSnapshot(collection => {
        const currentOrders = collection.docs.map(doc => doc.data());
        this.setState({ currentOrders });
      });
    this.unRegisterUserPastOrders = db
      .collection("orders")
      .where("username", "==", "harold")
      .where("status", "==", "Complete")
      .onSnapshot(collection => {
        const pastOrders = collection.docs.map(doc => doc.data());
        this.setState({ pastOrders });
      });
  }

  componentWillUnmount() {
    this.unRegisterUserCurrentOrders();
  }

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="text-center">Current Orders</h1>
            {this.state.currentOrders &&
              this.state.currentOrders.map((topic, index) => (
                <CardText key={index}>
                  Status: {topic.status}
                  <br />
                  Driver: {topic.driver}
                  <br />
                  <br />
                  Order Number: {topic.orderNumber}
                  <br />
                  {topic.resturant} - {topic.resturantAddress} <br />
                  Item: {topic.orderItems}
                  <br />
                  <br />
                  Time Submitted: {topic.timeSubmitted}
                  <br />
                  Time Picked up: {topic.timePickedUp}
                  <br />
                  <hr />
                </CardText>
              ))}
          </CardBody>
        </Card>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="text-center">Past Orders</h1>
            {this.state.pastOrders &&
              this.state.pastOrders.map((topic, index) => (
                <CardText key={index}>
                  Order Number: {topic.orderNumber}
                  <br />
                  {topic.resturant} <br />
                  Item: {topic.orderItems}
                  <br />
                  Driver: {topic.driver}
                  <br />
                  <br />
                  Time Submitted: {topic.timeSubmitted}
                  <br />
                  Time Picked up: {topic.timePickedUp}
                  <br />
                  Time Delivered: {topic.timeDelivered}
                  <hr />
                </CardText>
              ))}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Orders;
