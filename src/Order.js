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

class Order extends Component {
  componentDidMount() {
    document.title = "Order";
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <h1 id="title" className="display-3 text-center">McDonald's</h1>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4">
            <Card className="border-0 shadow">
              <CardBody>
                <CardTitle>Big Mac Meal</CardTitle>
                <CardText>560 - 1120 Calories</CardText>
                <Button color="danger" size="sm" onClick={this.toggle}>
                  Order
                </Button>
              </CardBody>
            </Card>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Big Mac Meal</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleCheckbox">Checkboxes</Label>
                    <div>
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        label="Check this custom checkbox"
                      />
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox2"
                        label="Or this one"
                      />
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox3"
                        label="But not this disabled one"
                        disabled
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCheckbox">Radios</Label>
                    <div>
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio"
                        name="customRadio"
                        label="Select this custom radio"
                      />
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio2"
                        name="customRadio"
                        label="Or this one"
                      />
                      <CustomInput
                        type="radio"
                        id="exampleCustomRadio3"
                        label="But not this disabled one"
                        disabled
                      />
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleCustomSelect">Quantity</Label>
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
          <Col xs="12" sm="12" md="6" lg="4">
            <Card className="border-0 shadow">
              <CardBody>
                <CardTitle>10 Mcnuggets Meal</CardTitle>
                <CardText>460 - 1020 Calories</CardText>
                <Button color="danger" size="sm" onClick={this.toggle}>
                  Order
                </Button>
              </CardBody>
            </Card>
          </Col>
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

export default Order;
