import React, { Component } from "react";
import { ListGroup, ListGroupItem, Container, Card } from "reactstrap";
import db from "./firebase";

class Problem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = "Problems";
    this.unRegisterProblem = db
      .collection("messages")
      .where("type", "==", "Problem")
      .onSnapshot(collection => {
        const problem = collection.docs.map(doc => doc.data());
        this.setState({ problem });
      });
  }
  componentWillUnmount() {
    this.unRegisterProblem();
  }
  render() {
    return (
      <Container>
        <h1 className="text-center restaurant-title">Problems</h1>
        <Card className="border-0 shadow">
          <ListGroup>
            {this.state.problem &&
              this.state.problem.map((topic, index) => (
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

export default Problem;
