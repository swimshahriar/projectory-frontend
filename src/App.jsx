import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// reducers
import { checkForAuth } from "./actions/authAction";
// components
import Header from "./components/Header/Header";
import PrivateRoute from "./helpers/PrivateRoute";
import About from "./pages/About";
import AddService from "./pages/AddService";
import Auth from "./pages/Auth";
import EditService from "./pages/EditService";
import Error404 from "./pages/Error404";
// pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import ProfileEdit from "./pages/ProfileEdit";
import ResetPass from "./pages/ResetPass";
import Services from "./pages/Services";
import UserProfile from "./pages/UserProfile";

function App() {
  console.log(import.meta.env.VITE_API_BASE_URI);
  const dispatch = useDispatch();
  const { token, isAuthCheck, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await dispatch(checkForAuth());
    })();
  }, [dispatch]);

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
        <Route component={Services} path="/services" exact />
        <PrivateRoute
          component={EditService}
          path="/edit-service/:sid"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={AddService}
          path="/add-service"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <Route component={UserProfile} path="/user-profile/:uid" />
        <PrivateRoute
          component={ProfileEdit}
          path={`/profile-edit/${uid}`}
          token={token}
          samePath
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
