import React, { Component } from "react";
import {
  Button,
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput,
  CardSubtitle
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
    };
  }

  componentDidMount() {
    document.title = "Admin Page";

    this.itemRemove = db
      .collection("restaurants/restaurant1/menu")
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
    db.doc("restaurants/restaurant1").update({
      open: !this.state.open
    });
  };

  updateStatus2 = e => {
    e.preventDefault();
    db.doc("restaurants/restaurant1").update({
      open: this.state.open
    });
  };

  updateInput = e => {
  this.setState({
    [e.target.name]: e.target.value
  });
  }

  addUser = e => {
  e.preventDefault();
  const userRef = db.collection("restaurants/restaurant1/menu").add({
    name: this.state.name,
    description: this.state.description,
    calories: this.state.calories,
    soldout: this.state.soldout
  });
  this.setState({
    name: "",
    description: "",
    calories: ""
  });
  };

  render() {
    return (
      <Container>
        <Card className="border-0 shadow">
          <CardBody>
            <h1 className="text-center">Restaurant Admin Page</h1>
            <h3 className="">Add Menu Item</h3>
            <div>
            <form onSubmit={this.addUser}>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                onChange={this.updateInput}
                value={this.state.name}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                onChange={this.updateInput}
                value={this.state.description}
              />
              <input
                type="text"
                name="calories"
                placeholder="Calories"
                onChange={this.updateInput}
                value={this.state.calories}
              />
              <button type="submit">Submit</button>
            </form>
            </div>
            <div>
              <h3>Remove Item</h3>
              {this.state.items &&
                this.state.items.map((menuItem, index) => (
                    <Card className="border-0 shadow">
                      <CardBody>
                        <CardTitle>{menuItem.name}</CardTitle>
                        <CardSubtitle>{menuItem.calories} Calories</CardSubtitle>
                        <CardText>
                          <small className="text-muted">
                            {menuItem.description}
                          </small>
                        </CardText>

                        <Button onClick={ ( ) =>
                          db
                            .collection('suggestions')
                            .doc( suggestion identifier )
                            .delete( )}>
                        Delete Me
                        </Button>

                      </CardBody>
                    </Card>

                ))}
            </div>
            <h3 className="">Close/Open Restaurant</h3>
            <Button color="primary" onClick={this.updateStatus2}>
              Open
            </Button>{" "}
            <Button color="primary" onClick={this.updateStatus}>
              Close
            </Button>{" "}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default RestaurantAdmin;
