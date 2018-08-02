import React, { Component } from "react";
import { ListGroup, ListGroupItem, Container, Card } from "reactstrap";
import db from "./firebase";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Feedback";
    this.unRegisterFeedback = db
      .collection("messages")
      .where("type", "==", "Feedback")
      .onSnapshot(collection => {
        const feedback = collection.docs.map(doc => doc.data());
        this.setState({ feedback });
      });
  }

  componentWillUnmount() {
    this.unRegisterFeedback();
  }
  render() {
    return (
      <Container>
        <h1 className="text-center restaurant-title">Feedback</h1>
        <Card className="border-0 shadow">
          <ListGroup>
            {this.state.feedback &&
              this.state.feedback.map((topic, index) => (
                <ListGroupItem key={index}>
                  {topic.name} - {topic.email} - {topic.timestamp}
                  <br />
                  <br />
                  {topic.message}
                </ListGroupItem>
              ))}
          </ListGroup>
        </Card>
      </Container>
    );
  }
}

export default Feedback;
