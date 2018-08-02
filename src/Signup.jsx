import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
  Container,
  Card
} from "reactstrap";
import classnames from "classnames";
import db from "./firebase";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    document.title = "Sign Up Requests";
    this.unRegisterDrivers = db
      .collection("driverRequest")
      .onSnapshot(collection => {
        const drivers = collection.docs.map(doc => doc.data());
        this.setState({ drivers });
      });
    this.unRegisterResturant = db
      .collection("resturantRequest")
      .onSnapshot(collection => {
        const resturant = collection.docs.map(doc => doc.data());
        this.setState({ resturant });
      });
  }

  componentWillUnmount() {
    this.unRegisterDrivers();
    this.unRegisterResturant();
  }
  render() {
    return (
      <Container>
        <h1 className="display-4 text-center restaurant-title">Sign Up Requests</h1>
        <Card className="border-0 shadow">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Drivers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Resturants
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.drivers &&
                    this.state.drivers.map((topic, index) => (
                      <tr key={index}>
                        <th scope="row">{topic.name}</th>
                        <td>{topic.address}</td>
                        <td>{topic.email}</td>
                        <td>{topic.reason}</td>
                        <td>{topic.status}</td>
                        <td>{topic.submissionTimeStamp}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId="2">
              <Table>
                <thead>
                  <tr>
                    <th>Contact Name</th>
                    <th>Contact Phone</th>
                    <th>Contact Email</th>
                    <th>Resturant Name</th>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Submission Time</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.resturant &&
                    this.state.resturant.map((topic, index) => (
                      <tr key={index}>
                        <th scope="row">{topic.localContactName}</th>
                        <td>{topic.localContactPhone}</td>
                        <td>{topic.localContactEmail}</td>
                        <td>{topic.resturantName}</td>
                        <td>{topic.resturantAddress}</td>
                        <td>{topic.foodType}</td>
                        <td>{topic.status}</td>
                        <td>{topic.submissionTimeStamp}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </TabPane>
          </TabContent>
        </Card>
      </Container>
    );
  }
}
