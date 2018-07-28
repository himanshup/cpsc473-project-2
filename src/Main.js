import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/restaurants" component={Restaurants} />
          <Route path="/test" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Main
