import React from "react";
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";

// components
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route component={Home} path="/" exact />
      </Switch>
    </>
  );
}

export default App;
