import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  BarbecueForm,
  BarbecueGrid,
  BarbecueConfirm,
  BarbecueSummary
} from "./components/barbecue";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={BarbecueGrid} />
        <Route path="/barbecue" exact component={BarbecueGrid} />
        <Route path="/barbecue/form" exact component={BarbecueForm} />
        <Route path="/barbecue/form/:id" exact component={BarbecueForm} />
        <Route path="/barbecue/confirm" exact component={BarbecueConfirm} />
        <Route path="/barbecue/summary" exact component={BarbecueSummary} />
      </Router>
    </>
  );
}
