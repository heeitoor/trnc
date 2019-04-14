import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  BarbecueForm,
  BarbecueGrid,
  BarbecueConfirm,
  BarbecueSummary
} from "./components/barbecue";

import { FriendForm } from "./components/friend";

export default function App() {
  const [list, setList] = useState([]);
  // const go = async () => {
  //   const response = await fetch('https://api.github.com/users/heeitoor/repos');
  //   const result = await response.json();

  //   setList(result);
  // };

  // useEffect(() => {
  //   go();
  // }, []);

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
      {/* <BarbecueGrid /> */}
      {/* <BarbecueConfirm />
      <FriendForm />
      <BarbecueSummary /> */}
      {/* <Button>asdasd</Button>
      <ul>
        {list.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
    </>
  );
}
