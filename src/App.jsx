import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// reducers
import { checkForAuth } from "./actions/authAction";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";

// components
import Header from "./components/Header/Header";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(checkForAuth());
    })();
  }, []);

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
