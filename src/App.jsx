import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// internal imports
import { checkForAuth } from "./actions/authAction";
// components
import Header from "./components/Header/Header";
import Loading from "./components/Loading";
import PrivateRoute from "./helpers/PrivateRoute";
// pages
const About = lazy(() => import("./pages/About"));
const AddService = lazy(() => import("./pages/AddService"));
const Auth = lazy(() => import("./pages/Auth"));
const EditService = lazy(() => import("./pages/EditService"));
const Error404 = lazy(() => import("./pages/Error404"));
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const ProfileEdit = lazy(() => import("./pages/ProfileEdit"));
const ResetPass = lazy(() => import("./pages/ResetPass"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Services = lazy(() => import("./pages/Services"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

function App() {
  const dispatch = useDispatch();
  const { token, isAuthCheck, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await dispatch(checkForAuth());
    })();
  }, [dispatch]);

  if (isAuthCheck) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <Header />
      </header>
      <Suspense fallback={<Loading />}>
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
          <Route component={ServiceDetails} path="/services/:sid" />
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
      </Suspense>
    </>
  );
}

export default App;
