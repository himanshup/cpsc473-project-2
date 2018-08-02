import React, { Component } from "react";
import {
  Container,
  Card,
  CardBody,
  Table
} from "reactstrap";
import "./Order.css";
import db from "./firebase";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Orders";

    this.unRegisterOrders = db.collection("orders").onSnapshot(collection => {
      const orders = collection.docs.map(doc => doc.data());
      this.setState({ orders });
    });
  }

  componentWillUnmount() {
    this.unRegisterOrders();
  }

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <div>
            <CardBody>
              <h1 className="text-center">Orders</h1>
            </CardBody>
            <Table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>User</th>
                  <th>Driver</th>
                  <th>Resturant</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders &&
                  this.state.orders.map((topic, index) => (
                    <tr key={index}>
                      <th scope="row">{topic.orderNumber}</th>
                      <td>{topic.username}</td>
                      <td>{topic.driver}</td>
                      <td>{topic.resturant}</td>
                      <td>{topic.orderItems}</td>
                      <td>{topic.status}</td>
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

export default Orders;
