import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Display from "../Display/Display";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Routing.css";

class Routing extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Switch>
          <Route path="/signup" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/display" component={Display} exact />
          <Redirect from="/" to="/login" exact />
        </Switch>
      </>
    );
  }
}

export default Routing;
