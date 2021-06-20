import React from "react";
import { Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";

// components
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Auth} path="/auth" />
        <Route component={About} path="/about" />
      </Switch>
    </>
  );
}

export default App;
