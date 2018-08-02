import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./Order.css";
import db from "./firebase";

class RestaurantAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      calories: "",
      open: true,
      soldout: false,
      removed: false
    };
  }

  componentDidMount() {
    document.title = "Admin Page";

    db.doc("restaurants/restaurant1")
      .get()
      .then(doc =>
        this.setState({
          open: doc.data().open
        })
      );

    this.itemRemove = db
      .collection("restaurants/restaurant1/menu")
      .where("removed", "==", false)
      .onSnapshot(collection => {
        const items = collection.docs.map(doc => doc.data());
        this.setState({ items });
      });
  }

  componentWillUnmount() {
    this.itemRemove();
  }

  handleFormChange(e) {
    this.setState(
      { [e.target.name]: e.target.value },
      this.showState.bind(this, this.props)
    );
  }

  updateStatus = e => {
    e.preventDefault();
    db.doc("restaurants/restaurant1")
      .update({
        open: false
      })
      .then(function() {
        alert("Successfully closed your restaurant!");
      })
      .catch(function(error) {
        console.error("Sorry, we couldn't close your restaurant.");
      });
    this.setState({
      open: false
    });
  };

  updateStatus2 = e => {
    e.preventDefault();
    db.doc("restaurants/restaurant1")
      .update({
        open: true
      })
      .then(function() {
        alert("Successfully opened your restaurant!");
      })
      .catch(function(error) {
        console.error("Sorry, we couldn't open your restaurant");
      });
    this.setState({
      open: true
    });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addUser = e => {
    e.preventDefault();
    const userRef = db
      .collection("restaurants/restaurant1/menu")
      .add({
        name: this.state.name,
        description: this.state.description,
        calories: this.state.calories
        // soldout: this.state.soldout,
        // removed: this.state.removed
      })
      .then(function() {
        alert("Item successfully added!");
      })
      .catch(function(error) {
        console.error("Sorry, couldn't add your item");
      });
    this.setState({
      name: "",
      description: "",
      calories: ""
    });
  };

  deleteItem(index) {
    const ref = db.collection("restaurants/restaurant1/menu").doc();
    ref.set({
      id: ref.id
    });
  }

  renderStatus() {
    if (this.state.open === true) {
      return (
        <div>
          <CardText className="text-center">
            Your restaurant is currently open, click the button to close.
          </CardText>
          <div className="text-center">
            <Button color="danger" onClick={this.updateStatus}>
              Close
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <CardText className="text-center">
            Your restaurant is currently closed, click the button to open.
          </CardText>
          <div className="text-center">
            <Button color="success" onClick={this.updateStatus2}>
              Open
            </Button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <h1 className="text-center restaurant-title">Restaurant Admin Page</h1>
        <Row>
          <Col sm="12" md="6" lg="6">
            <Card className="border-0 shadow">
              <CardBody>
                <CardTitle className="text-center">Add Menu Item</CardTitle>
                <Form onSubmit={this.addUser}>
                  <FormGroup>
                    <Label for="exampleEmail">Item Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Ex: Big Mac Meal"
                      onChange={this.updateInput}
                      value={this.state.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Description</Label>
                    <Input
                      type="text"
                      name="description"
                      placeholder="Ex: Large, Salad, Sprite"
                      onChange={this.updateInput}
                      value={this.state.description}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Calories</Label>
                    <Input
                      type="text"
                      name="calories"
                      placeholder="Ex: 9000"
                      onChange={this.updateInput}
                      value={this.state.calories}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button color="success" type="submit">
                      Add Item
                    </Button>
                  </div>
                </Form>
                {/* <div>
              <h3>Remove Item</h3>
              {this.state.items &&
                this.state.items.map((menuItem, index) => (
                  <Card
                    className="border-0 shadow"
                    key={index}
                    id={menuItem.id}
                  >
                    <CardBody>
                      <CardTitle>{menuItem.name}</CardTitle>
                      <CardSubtitle>{menuItem.calories} Calories</CardSubtitle>
                      <CardText>
                        <small className="text-muted">
                          {menuItem.description}
                        </small>
                      </CardText>

                      <Button onClick={e => this.deleteItem(menuItem.name)}>
                        Delete Me
                      </Button>
                    </CardBody>
                  </Card>
                ))}
            </div> */}
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6" lg="6">
            <Card className="border-0 shadow">
              <CardBody>
                <CardTitle className="text-center">
                  Open or Close Restaurant
                </CardTitle>
                {this.renderStatus()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RestaurantAdmin;
