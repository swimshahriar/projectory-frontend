import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, redirectUrl, token = null, samePath, ...props }) => {
  let routes = (
    <Route path={props.path} exact>
      {token ? <Component /> : <Redirect to={redirectUrl} />}
    </Route>
  );
  if (!samePath) {
    routes = (
      <Route path={props.path} exact>
        {token ? <Redirect to={redirectUrl} /> : <Component />}
      </Route>
    );
  }
  return routes;
};

export default PrivateRoute;
