import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Table,
  Button,
} from "reactstrap";
import "./Order.css";
import db from "./firebase";

class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvailable: true,
      btnDeliveredDisable: true,
      btnPickedUpDisable: false
    };
    this.handleDriverAccept = this.handleDriverAccept.bind(this);
    this.handleDriverPickUp = this.handleDriverPickUp.bind(this);
    this.handleDriverDelivered = this.handleDriverDelivered.bind(this);
  }

  componentDidMount() {
    document.title = "Driver Screen";

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
    this.unRegisterDriverAvailable();
    this.unRegisterDriver();
  }

  handleDriverAccept(orderNumber) {
    this.setState({ showAvailable: false });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ driver: "Bob" });
  }

  handleDriverPickUp(orderNumber) {
    this.setState({ btnDeliveredDisable: false, btnPickedUpDisable: true });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({
        status: "Picked Up, being delivered",
        timePickedUp: new Date().toString()
      });
  }

  handleDriverDelivered(orderNumber) {
    this.setState({ showAvailable: true });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ status: "Complete", timeDelivered: new Date().toString() });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.driverOrders &&
            this.state.driverOrders.map((topic, index) => (
              <Card className="border-0 shadow" key={index}>
                <CardHeader>
                  <div className="text-center" style={{ fontSize: "26px" }}>
                    Current Order
                  </div>
                </CardHeader>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <CardSubtitle style={{ fontSize: "20px" }}>
                      Pickup Location:
                    </CardSubtitle>
                    <div className="">
                      {topic.resturant}
                      <br />
                      {topic.resturantAddress}
                    </div>
                  </li>
                  <li className="list-group-item text-center">
                    <CardSubtitle style={{ fontSize: "20px" }}>
                      Drop Off Address:
                    </CardSubtitle>
                    <div className="">
                      Customer: {topic.username}
                      <br />
                      {topic.userAddress}
                    </div>
                  </li>
                  <li className="list-group-item text-center">
                    <CardSubtitle style={{ fontSize: "20px" }}>
                      Order #{topic.orderNumber}:
                    </CardSubtitle>
                    <div className="">{topic.orderItems}</div>
                  </li>
                  <CardFooter>
                    <div className="text-center">
                      <Button
                        disabled={this.state.btnPickedUpDisable}
                        onClick={e =>
                          this.handleDriverPickUp(topic.orderNumber)
                        }
                      >
                        Driver pick up
                      </Button>{" "}
                      <Button
                        color="success"
                        disabled={this.state.btnDeliveredDisable}
                        onClick={e =>
                          this.handleDriverDelivered(topic.orderNumber)
                        }
                      >
                        Delivered
                      </Button>
                    </div>
                  </CardFooter>
                </ul>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}

class Open extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvailable: true,
      btnDeliveredDisable: true,
      btnPickedUpDisable: false
    };
    this.handleDriverAccept = this.handleDriverAccept.bind(this);
    this.handleDriverPickUp = this.handleDriverPickUp.bind(this);
    this.handleDriverDelivered = this.handleDriverDelivered.bind(this);
  }

  componentDidMount() {
    document.title = "Driver Screen";

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
    this.unRegisterDriverAvailable();
    this.unRegisterDriver();
  }

  handleDriverAccept(orderNumber) {
    this.setState({ showAvailable: false });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ driver: "Bob" });
  }

  handleDriverPickUp(orderNumber) {
    this.setState({ btnDeliveredDisable: false, btnPickedUpDisable: true });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({
        status: "Picked Up, being delivered",
        timePickedUp: new Date().toString()
      });
  }

  handleDriverDelivered(orderNumber) {
    this.setState({ showAvailable: true });
    db.collection("orders")
      .doc(orderNumber.toString())
      .update({ status: "Complete", timeDelivered: new Date().toString() });
  }

  render() {
    return (
      <div>
        <h4 className="text-center">Open Requests</h4>
        <Table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Resturant</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.driverAvailableOrders &&
              this.state.driverAvailableOrders.map((topic, index) => (
                <tr key={index}>
                  <th scope="row">{topic.orderNumber}</th>
                  <td>{topic.resturant}</td>
                  <td>{topic.resturantAddress} </td>
                  <td>{topic.userAddress}</td>
                  <td>
                    <Link to="/driver/current">
                      <Button
                        color="success"
                        onClick={e =>
                          this.handleDriverAccept(topic.orderNumber)
                        }
                      >
                        Accept
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

class Driver extends Component {
  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="display-4 text-center">Driver Screen</h1>
            <div className="text-center">
              <Link to="/driver">
                <Button color="danger">Open Requests</Button>{" "}
              </Link>
              <Link to="/driver/current">
                <Button color="danger">Current Order</Button>
              </Link>
            </div>
          </CardBody>
          <Switch>
            <Route exact path="/driver" component={Open} />
          </Switch>
        </Card>
        <Row>
          <Col sm="12" md="6" lg="4">
            <Switch>
              <Route path="/driver/current" component={Current} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Driver;
