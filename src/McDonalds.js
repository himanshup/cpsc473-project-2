import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "./Order.css";
import db from "./firebase";

class McDonalds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: 0,
      restaurantName: "",
      restaurantAddress: "",
      driverViewAvailable: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.title = "McDonald's";

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
    this.item = db
      .collection("restaurants/restaurant1/menu")
      .onSnapshot(collection => {
        const items = collection.docs.map(doc => doc.data());
        this.setState({ items });
      });
    db.doc("restaurants/restaurant1")
      .get()
      .then(doc =>
        this.setState({
          restaurantName: doc.data().name,
          restaurantAddress: doc.data().address
        })
      );
  }

  componentWillUnmount() {
    this.item();
    this.unRegisterUserCurrentOrders();
  }

  handleSubmit(orderNumber, item, restaurant, restAddress) {
    const newOrder = {
      orderNumber: orderNumber,
      username: "harold",
      userAddress: "123 Fake Street",
      resturantAddress: restAddress,
      orderItems: item,
      driver: "-unassigned-",
      status: "Order Sent",
      resturant: restaurant,
      timeSubmitted: new Date().toString(),
      timePickedUp: "",
      timeDelivered: ""
    };
    console.log(newOrder);
    this.setState({ orderNumber: this.state.orderNumber + 1 });
    db.collection("orders")
      .doc(orderNumber.toString())
      .set(newOrder);
    db.doc("orders/settings").set({ orderID: orderNumber + 1 });
  }

  render() {
    return (
      <Container>
        <h1 className="text-center restaurant-title">
          {this.state.restaurantName} ({this.state.restaurantAddress})
        </h1>
        <Row>
          {this.state.items &&
            this.state.items.map((menuItem, index) => (
              <Col xs="12" sm="12" md="6" lg="4" key={index}>
                <Card className="border-0 shadow">
                  <CardBody>
                    <CardTitle>{menuItem.name}</CardTitle>
                    <CardSubtitle>{menuItem.calories} Calories</CardSubtitle>
                    <CardText>
                      <small className="text-muted">
                        {menuItem.description}
                      </small>
                    </CardText>
                    <Link to="/orders">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={e =>
                          this.handleSubmit(
                            this.state.orderNumber,
                            menuItem.name,
                            this.state.restaurantName,
                            this.state.restaurantAddress
                          )
                        }
                      >
                        Order
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}

          <Col xs="12" sm="12" md="12" lg="4">
            <Card className="border-0 shadow">
              <CardBody>
                <CardTitle>Current Order</CardTitle>
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
                      Items: {topic.orderItems}
                      <br />
                      <br />
                      Time Submitted: {topic.timeSubmitted}
                      <br />
                      Time Picked up: {topic.timePickedUp}
                      <br />
                    </CardText>
                  ))}
              </CardBody>
            </Card>
          </Col>

          {/* <Col xs="12" sm="12" md="12" lg="4">
            <Card className="border-0 shadow-lg">
              <CardTitle>Title</CardTitle>
              <CardText>Stuff</CardText>
            </Card>
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default McDonalds;
