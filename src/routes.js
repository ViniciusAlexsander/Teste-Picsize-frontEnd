import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Form from "./pages/Form";
import Loan from "./pages/LoanSimulation";


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Form} />
        <Route path="/loan-simulation" component={Loan} />
      </Switch>
    </BrowserRouter>
  );
}