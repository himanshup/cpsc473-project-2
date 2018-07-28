import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Restaurants from "./Restaurants";
import Order from "./Order";

class App extends Component {
  componentDidMount() {
    document.title = "Restaurants";
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Restaurants} />
          <Route path="/order" component={Order} />
        </Switch>
      </div>
    );
  }
}

export default App;
