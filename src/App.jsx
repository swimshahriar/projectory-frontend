import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from "@material-ui/core";

// reducers
import { checkForAuth } from "./actions/authAction";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Services from "./pages/Services";
import UserProfile from "./pages/UserProfile";
import Error404 from "./pages/Error404";
import ResetPass from "./pages/ResetPass";

// components
import Header from "./components/Header/Header";
import PrivateRoute from "./helpers/PrivateRoute";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  const dispatch = useDispatch();
  const { token, isAuthCheck, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await dispatch(checkForAuth());
    })();
  }, []);

  if (isAuthCheck) {
    return (
      <Container>
        <Typography variant="h4" color="textSecondary" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <Switch>
        <Route component={Home} path="/" exact />
        <PrivateRoute
          component={Auth}
          path="/auth"
          token={token}
          samePath={false}
          redirectUrl={`/user-profile/${uid}`}
        />
        <Route component={About} path="/about" />
        <Route component={Jobs} path="/jobs" />
        <Route component={Services} path="/services" />
        <Route component={UserProfile} path="/user-profile/:uid" />
        <PrivateRoute
          component={ProfileEdit}
          path={`/profile-edit/${uid}`}
          token={token}
          samePath={true}
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={ResetPass}
          path="/reset-password/:token"
          token={token}
          samePath={false}
          redirectUrl={`/user-profile/${uid}`}
        />
        <Route component={Error404} />
      </Switch>
    </>
  );
}

export default App;
