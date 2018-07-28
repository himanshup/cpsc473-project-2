import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge
} from "reactstrap";

class Restaurants extends React.Component {
  componentDidMount() {
    document.title = "Restaurants";
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12" sm="12" md="6" lg="4">
            <Link to="/order" className="custom-card">
              <Card className="shadow border-0 hvr-float">
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  alt="name"
                />
                <CardBody>
                  <CardTitle>Restaurant Name (Address)</CardTitle>
                  <CardSubtitle />
                  <CardText>
                    <Badge color="secondary">Food</Badge>
                    <Badge color="secondary">Type</Badge>
                    <Badge color="secondary">Here</Badge>
                  </CardText>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            <Link to="/order" className="custom-card">
              <Card className="shadow border-0 hvr-float">
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  alt="name"
                />
                <CardBody>
                  <CardTitle>Restaurant Name (Address)</CardTitle>
                  <CardSubtitle />
                  <CardText>
                    <Badge color="secondary">Something</Badge>
                    <Badge color="secondary">Here</Badge>
                  </CardText>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col xs="12" sm="12" md="6" lg="4">
            <Link to="/order" className="custom-card">
              <Card className="shadow border-0 hvr-float">
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  alt="name"
                />
                <CardBody>
                  <CardTitle>Restaurant Name (Address)</CardTitle>
                  <CardSubtitle />
                  <CardText>
                    <Badge color="secondary">Something</Badge>
                  </CardText>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Restaurants;
