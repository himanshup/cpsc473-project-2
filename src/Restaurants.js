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
import db from "./firebase";

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    document.title = "Restaurants";

    this.restaurantCollection = db
      .collection("restaurants")
      .onSnapshot(collection => {
        const courses = collection.docs.map(doc => doc.data());
        this.setState({ courses });
      });
  }

  componentWillUnmount() {
    this.restaurantCollection();
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.courses &&
            this.state.courses.map((topic, index) => (
              <Col xs="12" sm="12" md="6" lg="4" key={index}>
                <Link to={topic.to} className="custom-card">
                  <Card className="shadow border-0 hvr-float">
                    <CardImg
                      top
                      width="100%"
                      src={topic.picture}
                      alt={topic.name}
                    />
                    <CardBody>
                      <CardTitle>
                        {topic.name} ({topic.address})
                      </CardTitle>
                      <CardSubtitle />
                      <CardText>
                        <Badge color="secondary">{topic.tags[0]}</Badge>
                        <Badge color="secondary">{topic.tags[1]}</Badge>
                        <Badge color="secondary">{topic.tags[2]}</Badge>
                      </CardText>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}

export default Restaurants;
