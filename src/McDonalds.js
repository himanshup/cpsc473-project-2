import React, { Component } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
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
      modal: false,
      modal2: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
  }

  componentDidMount() {
    document.title = "McDonald's";

    this.itemOne = db
      .collection("restaurants/restaurant1/menu")
      .where("name", "==", "Big Mac Meal")
      .onSnapshot(collection => {
        const item1 = collection.docs.map(doc => doc.data());
        this.setState({ item1 });
      });

    this.itemTwo = db
      .collection("restaurants/restaurant1/menu")
      .where("name", "==", "McFlurry")
      .onSnapshot(collection => {
        const item2 = collection.docs.map(doc => doc.data());
        this.setState({ item2 });
      });
  }

  componentWillUnmount() {
    this.itemOne();
    this.itemTwo();
  }

  render() {
    return (
      <Container>
        <h1 className="display-4 text-center restaurant-title">McDonald's</h1>
        <Row>
          {this.state.item1 &&
            this.state.item1.map((menuItem, index) => (
              <Col xs="12" sm="12" md="6" lg="4" key={index}>
                <Card className="border-0 shadow">
                  <CardBody>
                    <CardTitle>{menuItem.name}</CardTitle>
                    <CardText>{menuItem.calories} Calories</CardText>
                    <Button color="danger" size="sm" onClick={this.toggle}>
                      Order
                    </Button>
                  </CardBody>
                </Card>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className={this.props.buttonLabel}
                >
                  <ModalHeader toggle={this.toggle}>
                    {menuItem.name}
                    <br />
                    <small>{menuItem.calories} Calories</small>
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleCheckbox">Size (Choose 1)</Label>
                        <div>
                          <CustomInput
                            type="radio"
                            id="exampleCustomRadio"
                            name="A"
                            label={menuItem.size[0]}
                            value={menuItem.size[0]}
                            defaultChecked
                          />
                          <CustomInput
                            type="radio"
                            id="exampleCustomRadio2"
                            name="A"
                            label={menuItem.size[1]}
                            value={menuItem.size[1]}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleCheckbox">Side (Choose 1)</Label>
                        <div>
                          <CustomInput
                            type="radio"
                            id="sideRadio1"
                            name="B"
                            label={menuItem.side[0]}
                            value={menuItem.side[0]}
                            defaultChecked
                          />
                          <CustomInput
                            type="radio"
                            id="sideRadio2"
                            name="B"
                            label={menuItem.side[1]}
                            value={menuItem.side[1]}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleCheckbox">Drink (Choose 1)</Label>
                        <div>
                          <CustomInput
                            type="radio"
                            id="drinkRadio1"
                            name="C"
                            label={menuItem.drink[0]}
                            value={menuItem.drink[0]}
                            defaultChecked
                          />
                          <CustomInput
                            type="radio"
                            id="drinkRadio2"
                            name="C"
                            label={menuItem.drink[1]}
                            value={menuItem.drink[1]}
                          />
                          <CustomInput
                            type="radio"
                            id="drinkRadio3"
                            name="C"
                            label={menuItem.drink[2]}
                            value={menuItem.drink[2]}
                          />
                          <CustomInput
                            type="radio"
                            id="drinkRadio4"
                            name="C"
                            label={menuItem.drink[3]}
                            value={menuItem.drink[3]}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleCheckbox">
                          Dressing (Choose between 0 and 1)
                        </Label>
                        <div>
                          <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox"
                            label={menuItem.dressing[0]}
                            value={menuItem.dressing[0]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox2"
                            label={menuItem.dressing[1]}
                            value={menuItem.dressing[1]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="exampleCustomCheckbox3"
                            label={menuItem.dressing[2]}
                            value={menuItem.dressing[2]}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="item1Select">Quantity</Label>
                        <CustomInput
                          type="select"
                          id="item1Select"
                          name="quantity"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </CustomInput>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.toggle}>
                      Add to cart
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
            ))}

          {this.state.item2 &&
            this.state.item2.map((menuItem, index) => (
              <Col xs="12" sm="12" md="6" lg="4" key={index}>
                <Card className="border-0 shadow">
                  <CardBody>
                    <CardTitle>{menuItem.name}</CardTitle>
                    <CardText>{menuItem.calories} Calories</CardText>
                    <Button color="danger" size="sm" onClick={this.toggle2}>
                      Order
                    </Button>
                  </CardBody>
                </Card>
                <Modal
                  isOpen={this.state.modal2}
                  toggle={this.toggle2}
                  className={this.props.buttonLabel}
                >
                  <ModalHeader toggle={this.toggle2}>
                    {menuItem.name}
                    <br />
                    <small>{menuItem.calories} Calories</small>
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="exampleCheckbox">
                          Toppings (Choose between 0 and 5)
                        </Label>
                        <div>
                          <CustomInput
                            type="checkbox"
                            id="toppingCheckbox"
                            label={menuItem.toppings[0]}
                            value={menuItem.toppings[0]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="toppingCheckbox1"
                            label={menuItem.toppings[1]}
                            value={menuItem.toppings[1]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="toppingCheckbox2"
                            label={menuItem.toppings[2]}
                            value={menuItem.toppings[2]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="toppingCheckbox3"
                            label={menuItem.toppings[3]}
                            value={menuItem.toppings[3]}
                          />
                          <CustomInput
                            type="checkbox"
                            id="toppingCheckbox4"
                            label={menuItem.toppings[4]}
                            value={menuItem.toppings[4]}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <Label for="item2Select">Quantity</Label>
                        <CustomInput
                          type="select"
                          id="item2Select"
                          name="quantity"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </CustomInput>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={this.toggle2}>
                      Add to cart
                    </Button>{" "}
                    <Button color="secondary" onClick={this.toggle2}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
            ))}
          <Col xs="12" sm="12" md="12" lg="4">
            <Card className="border-0 shadow-lg">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Button className="" color="success" size="lg" block disabled>
                    Checkout
                  </Button>
                </li>
                <li className="list-group-item">
                  <ul>
                    <Row>
                      <Col xs="4">
                        <FormGroup>
                          <CustomInput
                            type="select"
                            id="exampleCustomSelect"
                            name="quantity"
                          >
                            <option value="1">1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </CustomInput>
                        </FormGroup>
                      </Col>
                      <Col xs="8">
                        <li>Big Mac Meal</li>
                        <li>
                          <small className="text-muted">Medium</small>
                        </li>
                        <li>
                          <small className="text-muted">French Fries</small>
                        </li>
                        <li>
                          <small className="text-muted">Coke</small>
                        </li>
                        <li>
                          <a href="/" className="removeBtn">
                            <small>Remove</small>
                          </a>
                        </li>
                      </Col>
                    </Row>
                  </ul>
                </li>
                <li className="list-group-item text-center">
                  1 Item in your cart.
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default McDonalds;
