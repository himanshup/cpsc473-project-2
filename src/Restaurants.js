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
import {db} from './firebase'

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
    };
  }

  componentDidMount() {
    document.title = "Restaurants";

    this.restaurantCollection = db.collection("restaurants").onSnapshot(collection => {
      const courses = collection.docs.map(doc => doc.data())
      this.setState({courses})
    });

    this.menuCollection = db.collection("/restaurants/3WYzeaPJLiCJPCIG2r8g/menu").onSnapshot(collection => {
      const menus = collection.docs.map(doc => doc.data())
      this.setState({menus})
    });
  }

  render() {
    return (
      <Container>
        <Row>
        {this.state.courses && this.state.courses.map((topic, index) =>
          <Col xs="12" sm="12" md="6" lg="4" key={index}>
            <Link to="/order" className="custom-card">
              <Card className="shadow border-0 hvr-float">
                <CardImg
                  top
                  width="100%"
                  src={topic.picture}
                  alt={topic.name}
                />
                <CardBody>
                  <CardTitle>{topic.name} ({topic.address})</CardTitle>
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
        )}
        </Row>
        <h1>menu</h1>
        <p>
        {this.state.menus &&  this.state.menus.map((topic, index) =><li key={index}>{topic.name}<br />Size: {topic.size}<br />Side: {topic.side}<br />Drink: {topic.drink}</li>)}
        </p>
      </Container>
    );
  }
}

export default Restaurants;
