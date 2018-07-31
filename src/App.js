import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Restaurants from "./Restaurants";
import McDonalds from "./McDonalds";
import Panda from "./Panda";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Restaurants} />
          <Route path="/mcdonalds" component={McDonalds} />
          <Route path="/panda-express" component={Panda} />
        </Switch>
      </div>
    );
  }
}

export default App;
