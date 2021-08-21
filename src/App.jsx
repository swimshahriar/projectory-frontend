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
const AddService = lazy(() => import("./pages/services/AddService"));
const Auth = lazy(() => import("./pages/Auth"));
const EditService = lazy(() => import("./pages/services/EditService"));
const Error404 = lazy(() => import("./pages/Error404"));
const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/jobs/Jobs"));
const ProfileEdit = lazy(() => import("./pages/users/ProfileEdit"));
const ResetPass = lazy(() => import("./pages/ResetPass"));
const ServiceDetails = lazy(() => import("./pages/services/ServiceDetails"));
const Services = lazy(() => import("./pages/services/Services"));
const FavServices = lazy(() => import("./pages/services/FavServices"));
const UserProfile = lazy(() => import("./pages/users/UserProfile"));
const UserPostedJobs = lazy(() => import("./pages/jobs/UserPostedJobs"));
const AddJob = lazy(() => import("./pages/jobs/AddJob"));
const EditJob = lazy(() => import("./pages/jobs/EditJob"));
const JobDetails = lazy(() => import("./pages/jobs/JobDetails"));
const SkillTestList = lazy(() => import("./pages/skillTests/SkillTestList"));

const App = () => {
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
          <Route component={About} path="/about" />

          {/* ---------------- jobs ----------------- */}
          <Route component={Jobs} path="/jobs" />
          <Route component={JobDetails} path="/job-details/:jid" exact />
          <PrivateRoute
            component={UserPostedJobs}
            path="/user-posted-jobs"
            token={token}
            samePath
            redirectUrl="/auth"
          />
          <PrivateRoute
            component={AddJob}
            path="/add-job"
            token={token}
            samePath
            redirectUrl="/auth"
          />
          <PrivateRoute
            component={EditJob}
            path="/edit-job/:jid"
            token={token}
            samePath
            redirectUrl="/auth"
          />

          {/* ---------------- services ----------------- */}
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
          <PrivateRoute
            component={FavServices}
            path={`/fav-services/${uid}`}
            token={token}
            samePath
            redirectUrl="/auth"
          />
          <Route component={ServiceDetails} path="/services/:sid" />

          {/* ---------------- users ----------------- */}
          <PrivateRoute
            component={Auth}
            path="/auth"
            token={token}
            samePath={false}
            redirectUrl={`/user-profile/${uid}`}
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

          {/* ---------------- skill tests ----------------- */}
          <PrivateRoute
            component={SkillTestList}
            path="/skill-tests"
            token={token}
            samePath
            redirectUrl="/auth"
          />

          <Route component={Error404} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
