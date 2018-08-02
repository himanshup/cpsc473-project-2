import React from "react";
import { Jumbotron, Container } from "reactstrap";

const Home = () => (
  <Container>
    <Jumbotron>
      <h1 className="display-3">Welcome!</h1>
      <p className="lead">
        This is the Admin page where you can view feedback, problems, historical
        orders, and sign up requests.
      </p>
      <hr className="my-2" />
      <p>Thank you</p>
    </Jumbotron>
  </Container>
);

export default Home;
