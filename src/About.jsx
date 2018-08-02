import React, { Component } from "react";
import { Container, Card } from "reactstrap";
import edwardLogo from "./img/Ed.png";
import himanshuLogo from "./img/Him.png";
import ryanLogo from "./img/Ry.png";
import juanLogo from "./img/Juan.png";
import mapImage from "./img/CSUF.png";

class About extends Component {
  componentDidMount() {
    document.title = "About Us";
    document.body.style = "background: #f7f7f7;";
  }

  componentWillUnmount() {
    document.body.style = "background: #f7f7f7;";
  }

  render() {
    return (
      <Container>
        <Card className="shadow border-0" id="loginForm">
          <div>
            <div className="mx-auto text-center">
              <h1 className="display-4">About Us</h1>
              <p className="lead">
                We are an online, and mobile food ordering company dedicated to
                connecting hungry diners with local takeout restaurants. The
                company’s online and mobile ordering platforms allow diners to
                order from many local takeout restaurants in Orange County.
                Every order is supported by the company’s 24/7 customer service
                teams.
              </p>
            </div>

            <div className="card-deck mb-3 text-center">
              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Edward Su</h4>
                </div>
                <div className="card-body">
                  <img src={edwardLogo} alt="edwardLogo" />
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Himanshu Patel</h4>
                </div>
                <div className="card-body">
                  <img src={himanshuLogo} alt="himanshuLogo" />
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Ryan Talactac</h4>
                </div>
                <div className="card-body">
                  <img src={ryanLogo} alt="ryanLogo" />
                </div>
              </div>

              <div className="card mb-4 shadow-sm">
                <div className="card-header">
                  <h4 className="my-0 font-weight-normal">Juan Aguillon</h4>
                </div>
                <div className="card-body">
                  <img src={juanLogo} alt="juanLogo" />
                </div>
              </div>
            </div>

            <div className="px-3 pt-md-5 pb-md-4 mx-auto text-center">
              <h1 className="display-4">Location</h1>
              <img src={mapImage} alt="mapImage" />
            </div>
          </div>
        </Card>
      </Container>
    );
  }
}

export default About;
