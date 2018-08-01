import React, { Component } from "react";
import { Container, Card, CardText, CardBody, CardTitle } from "reactstrap";
import "./Order.css";
import db from "./firebase";

class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Restaurant Screen";

    db.doc("orders/settings")
      .get()
      .then(document => {
        if (document.exists) {
          this.setState({ orderNumber: document.data().orderID });
        }
      });

    this.unRegisterResturant = db
      .collection("orders")
      .where("status", "==", "Order Sent")
      .onSnapshot(collection => {
        const resturantOrders = collection.docs.map(doc => doc.data());
        this.setState({ resturantOrders });
      });
  }

  componentWillUnmount() {
    this.unRegisterResturant();
  }

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="text-center">Restaurant Screen</h1>
            {this.state.resturantOrders &&
              this.state.resturantOrders.map((topic, index) => (
                <CardText key={index}>
                  Order Number: {topic.orderNumber}
                  <br />
                  Items: {topic.orderItems}
                  <br />
                  <br />
                  Customer: {topic.username}
                  <br />
                  Driver: {topic.driver}
                  <hr />
                </CardText>
              ))}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default RestaurantScreen;
