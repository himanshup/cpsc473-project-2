import React, { Component } from "react";
import { Container } from "reactstrap";

class Order extends Component {
  componentDidMount() {
    document.title = "Order";
  }

  render() {
    return (
      <Container>
        <h1 className="text-center">Order Page</h1>
      </Container>
    );
  }
}

export default Order;
