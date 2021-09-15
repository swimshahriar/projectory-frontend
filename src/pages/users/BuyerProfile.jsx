import { Box, Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import React, { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// actions
import { fetchJobs } from "../../actions/jobAction";
import { fetchOrders } from "../../actions/orderAction";
import { fetchUserInfo } from "../../actions/userAction";
import SiteLayout from "../../components/layouts/SiteLayout";
// components
import Loading from "../../components/Loading";
import UserLinks from "../../components/UserLinks";

// styles
const useStyles = makeStyles((theme) => ({
  iconCenter: {
    display: "flex",
    placeItems: "center",
    gap: 5,
  },
  onlineBadge: {
    border: 1.5,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    padding: "2px 3px",
    paddingRight: "5px",
    opacity: 0.8,
  },
  mtMd: {
    marginTop: 10,
  },
  mrSm: {
    marginRight: 5,
  },
  textBold: {
    fontWeight: "bold",
  },
  account: {
    border: 1,
    borderColor: theme.palette.text.secondary,
    borderStyle: "solid",
    borderRadius: 5,
    padding: "2px 3px",
    marginRight: 5,
  },
}));

const BuyerProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const { jobs } = useSelector((state) => state.jobs);
  const { orders } = useSelector((state) => state.orders);
  const { uid: userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // ------------------ check for admin ------------------
    if (userId === import.meta.env.VITE_ADMIN_ID) {
      return history.push("/admin");
    }
    (async () => {
      await dispatch(fetchUserInfo(userId));
      await dispatch(fetchJobs({ uid }));
      await dispatch(fetchOrders({ type: "services", reqUid: uid }, token));
    })();
  }, [userId, dispatch, history, uid, token]);

  // format date
  let memberSince = null;
  if (user) {
    memberSince = new Date(user.createdAt).toDateString().split(" ").splice(1, 3).join(" ");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        {uid && userId === uid && (
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/user-profile/${uid}`)}
            >
              Go to Seller Profile
            </Button>
          </Box>
        )}

        {/* ------------------------- user links ------------------------ */}
        {uid && uid === userId && (
          <UserLinks>
            <Button color="secondary" variant="outlined" onClick={() => history.push("/add-job")}>
              Add Job
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => history.push("/user-posted-jobs")}
            >
              Posted Jobs
            </Button>

            <Button
              color="secondary"
              variant="outlined"
              onClick={() => history.push(`/orders/buyer-jobs`)}
            >
              Job Orders
            </Button>

            <Button
              color="primary"
              variant="outlined"
              onClick={() => history.push(`/orders/buyer-services`)}
            >
              Service Orders
            </Button>

            <Button
              color="secondary"
              variant="outlined"
              onClick={() => history.push(`/fav-services/${uid}`)}
            >
              Favorite Services
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => history.push(`/user-topup/`)}
            >
              Topup
            </Button>
          </UserLinks>
        )}

        <Box display="flex" justifyContent="center" flexWrap="wrap" gridGap={15} mt={3}>
          <Box flex={35} minWidth="300px">
            {/* ------------------ user img with location join date ------------------ */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxShadow={3}
              borderRadius={5}
              p={5}
            >
              <Box width="100%">
                <Box display="flex" justifyContent="flex-end">
                  <Typography
                    align="center"
                    color="primary"
                    className={`${classes.onlineBadge} ${classes.iconCenter}`}
                  >
                    <GoPrimitiveDot /> Online
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center">
                  <Image
                    cloud_name="swimshahriar"
                    public_id={user.avatar}
                    upload_preset="projectory_avatars"
                    width="200"
                    height="200"
                    radius="max"
                    crop="fill"
                  />
                </Box>
                <Typography
                  variant="h6"
                  component="h6"
                  align="center"
                  color="textPrimary"
                  className={classes.mtMd}
                >
                  {user.userName}
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  align="center"
                  color="textSecondary"
                  className={classes.mtMd}
                >
                  {user.tagLine ? (
                    user.tagLine
                  ) : (
                    <Typography component="span">No tagline added.</Typography>
                  )}
                </Typography>

                {/* ------------------------- contact button ------------------------ */}
                {uid !== user._id && (
                  <Box my={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => history.push(`/chats?rid=${user._id}`)}
                    >
                      Contact
                    </Button>
                  </Box>
                )}
                <Divider className={classes.mtMd} />
                <Box display="flex" justifyContent="space-between" className={classes.mtMd}>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textSecondary"
                    className={classes.iconCenter}
                  >
                    <HiLocationMarker />
                    From
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textPrimary"
                    className={classes.textBold}
                  >
                    {user.location ? (
                      user.location
                    ) : (
                      <Typography component="span">Not yet added.</Typography>
                    )}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" className={classes.mtMd}>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textSecondary"
                    className={classes.iconCenter}
                  >
                    <BsFillPersonFill />
                    Member Since
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    color="textPrimary"
                    className={classes.textBold}
                  >
                    {user.createdAt ? (
                      memberSince
                    ) : (
                      <Typography component="span">Not yet added.</Typography>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ----------------------- Right Side ------------------------ */}
          <Box flex={65}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gridGap={15}
            >
              {/* --------------------- balance ------------------ */}
              {uid === user._id && (
                <Paper>
                  <Box minWidth="12rem" p={2}>
                    <Box>
                      <Typography variant="h6" color="textSecondary">
                        Balance
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textPrimary">
                      Current: {user.balance || 0}tk
                    </Typography>
                  </Box>
                </Paper>
              )}

              {/* -------------------- last topup -------------------- */}
              {uid === user._id && (
                <Paper>
                  <Box minWidth="12rem" p={2}>
                    <Box>
                      <Typography variant="h6" color="textSecondary">
                        Last Topup
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="textPrimary">
                      Date:{" "}
                      {(user?.lastTopup && new Date(user.lastTopup).toDateString()) || "not yet"}
                    </Typography>
                  </Box>
                </Paper>
              )}
              {/* --------------------- jobs posted --------------- */}
              <Paper>
                <Box minWidth="12rem" p={2}>
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      Jobs Posted
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textPrimary">
                    Total: {jobs?.length || 0}
                  </Typography>
                </Box>
              </Paper>
              {/* --------------------- services ordered --------------- */}
              <Paper>
                <Box minWidth="12rem" p={2}>
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      Services Ordered
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textPrimary">
                    Total: {orders?.length || 0}
                  </Typography>
                </Box>
              </Paper>

              {/* --------------------- spent on services --------------- */}
              <Paper>
                <Box minWidth="12rem" p={2}>
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      Spent on Services
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textPrimary">
                    Total:{" "}
                    {orders?.reduce((acc, ord) => {
                      if (ord.status === "finished") {
                        return (acc += parseFloat(ord.price));
                      }
                      return acc;
                    }, 0)}
                    tk
                  </Typography>
                </Box>
              </Paper>

              {/* --------------------- spent on services --------------- */}
              <Paper>
                <Box minWidth="12rem" p={2}>
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      Spent on Jobs
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textPrimary">
                    Total:{" "}
                    {jobs?.reduce((acc, job) => {
                      if (job.status === "finished") {
                        return (acc += parseFloat(job.price));
                      }
                      return acc;
                    }, 0)}
                    tk
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default BuyerProfile;
