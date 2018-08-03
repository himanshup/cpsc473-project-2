import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Restaurants from "./Restaurants";
import McDonalds from "./McDonalds";
import BaskinRobbins from "./BaskinRobbins";
import Orders from "./Orders";
import RestaurantScreen from "./RestaurantScreen";
import Driver from "./Driver";
import RestaurantAdmin from "./RestaurantAdmin";
import Signup from "./Signup";
import Feedback from "./Feedback";
import Problem from "./Problem";
import Landing from "./Landing";
import NavBar2 from "./NavBar2";
import RestAurantSignUp from "./ResturantSignUp";
import Contact from "./Contact";
import DriverSignUp from "./DriverSignUp";
import firebase from "./firebaseAuth";
import { Container } from "reactstrap";
import About from "./About";

const NoMatch = ({ location }) => (
  <Container>
    <div className="text-center">
      <h1 className="display-1 error-title">Error 404</h1>
      <h2 className="display-4">
        The path <code>{location.pathname}</code> does not exist.
      </h2>
    </div>
  </Container>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      modal: false
    };
    this.authListener = this.authListener.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.authListener();
    // document.body.style = "background: #f7f7f7;";
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Restaurants} />
              <Route path="/mcdonalds" component={McDonalds} />
              <Route path="/baskin-robbins" component={BaskinRobbins} />
              {/* <Route path="/home" component={Home} /> */}
              <Route path="/feedback" component={Feedback} />
              <Route path="/problem" component={Problem} />
              <Route path="/orders" component={Orders} />
              <Route path="/signup" component={Signup} />
              <Route path="/restaurantscreen" component={RestaurantScreen} />
              <Route path="/driver" component={Driver} />
              <Route path="/restaurantadmin" component={RestaurantAdmin} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        ) : (
          <div>
            <NavBar2 />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/restaurantsignup" component={RestAurantSignUp} />
              <Route path="/driversignup" component={DriverSignUp} />
              <Route path="/contact" component={Contact} />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
