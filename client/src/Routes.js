import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Welcome from './components/Welcome';


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/welcome">
        <Welcome />
      </Route>
    </Switch>
  );
}