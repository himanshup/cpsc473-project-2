import React, { Component } from "react";
import { Container, Card, CardBody, Table } from "reactstrap";
import "./Order.css";
import db from "./firebase";

class RestaurantScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Restaurant Screen";

    this.unRegisterRestaurant = db
      .collection("orders")
      .where("status", "==", "Order Sent")
      .onSnapshot(collection => {
        const restaurantOrders = collection.docs.map(doc => doc.data());
        this.setState({ restaurantOrders });
      });
  }

  componentWillUnmount() {
    this.unRegisterRestaurant();
  }

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <div>
            <CardBody>
              <h1 className="display-4 text-center">Restaurant Screen</h1>
              <h4 className="text-center">Open Requests</h4>
            </CardBody>
            <Table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Items</th>
                  <th>Customer</th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {this.state.restaurantOrders &&
                  this.state.restaurantOrders.map((topic, index) => (
                    <tr key={index}>
                      <th scope="row">{topic.orderNumber}</th>
                      <td>{topic.orderItems}</td>
                      <td>{topic.username} </td>
                      <td>{topic.driver}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    );
  }
}

export default RestaurantScreen;
