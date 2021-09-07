import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// internal imports
import { checkForAuth } from "./actions/authAction";
import SiteLayout from "./components/layouts/SiteLayout";
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
const BuyerProfile = lazy(() => import("./pages/users/BuyerProfile"));
const UserPostedJobs = lazy(() => import("./pages/jobs/UserPostedJobs"));
const AddJob = lazy(() => import("./pages/jobs/AddJob"));
const EditJob = lazy(() => import("./pages/jobs/EditJob"));
const JobDetails = lazy(() => import("./pages/jobs/JobDetails"));
const SkillTestList = lazy(() => import("./pages/skillTests/SkillTestList"));
const TestPage = lazy(() => import("./pages/skillTests/TestPage"));
const Chats = lazy(() => import("./pages/chats/Chats"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const AdminChats = lazy(() => import("./pages/admin/AdminChats"));
const AdminSkillTests = lazy(() => import("./pages/admin/AdminSkillTests"));
const AdminEditSkillTests = lazy(() => import("./pages/skillTests/AdminEditSkillTests"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminAddSkillTest = lazy(() => import("./pages/skillTests/AdminAddSkillTest"));
const SellerServiceOrders = lazy(() => import("./pages/orders/SellerServiceOrders"));
const SellerJobOrders = lazy(() => import("./pages/orders/SellerJobOrders"));
const BuyerServiceOrders = lazy(() => import("./pages/orders/BuyerServiceOrders"));
const BuyerJobOrders = lazy(() => import("./pages/orders/BuyerJobOrders"));
const OrderDetails = lazy(() => import("./pages/orders/OrderDetails"));
const Topup = lazy(() => import("./pages/payments/Topup"));
const Withdraw = lazy(() => import("./pages/payments/Withdraw"));
const AdminTopup = lazy(() => import("./pages/payments/AdminTopup"));
const AdminWithdraw = lazy(() => import("./pages/payments/AdminWithdraw"));
const Success = lazy(() => import("./pages/payments/Success"));

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
        <Route component={BuyerProfile} path="/buyer-profile/:uid" />
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
        <PrivateRoute
          component={TestPage}
          path="/skill-test/:tid"
          token={token}
          samePath
          redirectUrl="/auth"
        />

        {/* --------------------- chats --------------------- */}
        <Route path="/chats">
          {token ? (
            <SiteLayout>
              <Chats />
            </SiteLayout>
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        {/* ---------------------- admin --------------------- */}
        <Route path="/admin" exact>
          {token && uid === import.meta.env.VITE_ADMIN_ID ? <Admin /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/admin/chats">
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminChats />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/skill-test" exact>
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminSkillTests />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/skill-test/:tid" exact>
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminEditSkillTests />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/add-skill-test" exact>
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminAddSkillTest />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/site-settings">
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminSettings />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/topup">
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminTopup />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>
        <Route path="/admin/withdraw">
          {token && uid === import.meta.env.VITE_ADMIN_ID ? (
            <AdminWithdraw />
          ) : (
            <Redirect to="/auth" />
          )}
        </Route>

        {/* ------------------------ orders ----------------------- */}
        <PrivateRoute
          component={SellerServiceOrders}
          path="/orders/seller-services"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={SellerJobOrders}
          path="/orders/seller-jobs"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={BuyerServiceOrders}
          path="/orders/buyer-services"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={BuyerJobOrders}
          path="/orders/buyer-jobs"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={OrderDetails}
          path="/orders/:oid"
          token={token}
          samePath
          redirectUrl="/auth"
        />

        {/* -------------------- payments ------------------- */}
        <PrivateRoute
          component={Topup}
          path="/user-topup"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={Withdraw}
          path="/user-withdraw"
          token={token}
          samePath
          redirectUrl="/auth"
        />
        <PrivateRoute
          component={Success}
          path="/payment-succeed/:amount"
          token={token}
          samePath
          redirectUrl="/auth"
        />

        <Route component={Error404} />
      </Switch>
    </Suspense>
  );
};

export default App;
