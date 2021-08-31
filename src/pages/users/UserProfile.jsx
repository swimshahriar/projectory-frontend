import { Box, Button, Container, Divider, Link, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import React, { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOrders } from "../../actions/orderAction";
import { fetchServices } from "../../actions/serviceAction";
// actions
import { fetchUserInfo } from "../../actions/userAction";
// components
import SiteLayout from "../../components/layouts/SiteLayout";
import Loading from "../../components/Loading";
import RoundedBox from "../../components/RoundedBox";
import ServiceCard from "../../components/ServiceCard";
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

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);
  const { user, isLoading } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const { services, isLoading: isServicesLoading } = useSelector((state) => state.services);
  const { uid: userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // ------------------ check for admin ------------------
    if (userId === import.meta.env.VITE_ADMIN_ID) {
      return history.push("/admin");
    }
    (async () => {
      await dispatch(fetchUserInfo(userId));
      await dispatch(fetchServices({ uid: userId }));
      await dispatch(fetchOrders({ type: "services", recUid: uid }, token));
    })();
  }, [userId, dispatch, history, token, uid]);

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
          <Box mt={3} display="flex" justifyContent="flex-end" gridGap={15}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(`/buyer-profile/${uid}`)}
            >
              Go to Buyer Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push(`/profile-edit/${uid}`)}
            >
              <FaEdit className={classes.mrSm} />
              Edit
            </Button>
          </Box>
        )}

        {/* ------------------------- user links ------------------------ */}
        {uid && uid === userId && (
          <UserLinks>
            <Button color="primary" variant="outlined" onClick={() => history.push("/add-service")}>
              Add Service
            </Button>

            <Button
              color="secondary"
              variant="outlined"
              onClick={() => history.push(`/orders/seller-services`)}
            >
              Service Orders
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => history.push(`/orders/seller-jobs`)}
            >
              Job Orders
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => {
                if (uid === userId) {
                  history.push(`/earnings/${uid}`);
                }
              }}
            >
              Earnings
            </Button>
            <Button color="primary" variant="outlined" onClick={() => history.push("/skill-tests")}>
              Skill Tests
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => history.push(`/fav-services/${uid}`)}
            >
              Withdraw
            </Button>
          </UserLinks>
        )}

        {/* ----------------------- account info  ------------------------ */}
        <Box my={3}>
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

            {/* --------------------- jobs completed --------------- */}
            <Paper>
              <Box minWidth="12rem" p={2}>
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Jobs Completed
                  </Typography>
                </Box>
                <Typography variant="body1" color="textPrimary">
                  Total:{" "}
                  {orders?.reduce((acc, odr) => {
                    let count = 0;
                    if (odr.status === "finished") {
                      count = acc + 1;
                    }
                    return count;
                  }, 0) || 0}
                </Typography>
              </Box>
            </Paper>

            {/* -------------------- last withdraw -------------------- */}
            {uid === user._id && (
              <Paper>
                <Box minWidth="12rem" p={2}>
                  <Box>
                    <Typography variant="h6" color="textSecondary">
                      Last Withdraw
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textPrimary">
                    Date: {user.lastWithdraw || "not yet"}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>

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
            {/* ----------------------- description ---------------------- */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              boxShadow={3}
              borderRadius={5}
              p={5}
              mt={3}
              mb={3}
            >
              <Typography
                variant="h6"
                component="h6"
                align="left"
                color="textPrimary"
                className={classes.mtMd}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                component="p"
                align="left"
                color="textSecondary"
                className={classes.mtMd}
              >
                {user.description ? (
                  user.description
                ) : (
                  <Typography component="span">Not yet added.</Typography>
                )}
              </Typography>
              <Divider className={classes.mtMd} />
              {/* ------------------------ languages --------------------- */}
              <Typography
                variant="h6"
                component="h6"
                align="left"
                color="textPrimary"
                className={classes.mtMd}
              >
                Languages
              </Typography>
              {!user.languages ? (
                <Typography component="span">Not yet added.</Typography>
              ) : (
                user.languages.map((lan, idx) => (
                  <Typography
                    variant="body1"
                    component="p"
                    align="left"
                    color="textPrimary"
                    className={`${classes.mtMd} ${classes.textBold}`}
                    key={idx}
                  >
                    {lan}
                  </Typography>
                ))
              )}
              <Divider className={classes.mtMd} />

              {/* -------------------------- linked account --------------------------- */}
              <Typography
                variant="h6"
                component="h6"
                align="left"
                color="textPrimary"
                className={classes.mtMd}
              >
                Linked Accounts
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {!user.linkedAccounts || user.linkedAccounts.length <= 0 ? (
                  <Typography component="span">Not yet added.</Typography>
                ) : (
                  user.linkedAccounts.map((acc, idx) => (
                    <RoundedBox
                      key={idx}
                      borderColor={idx % 2 !== 0 ? "primary.main" : "secondary.main"}
                    >
                      <Link href={acc.link} color="textSecondary" target="_blank">
                        {acc.title}
                      </Link>
                    </RoundedBox>
                  ))
                )}
              </Box>
              <Divider className={classes.mtMd} />
              {/* ----------------------------- Skills ----------------------------- */}
              <Typography
                variant="h6"
                component="h6"
                align="left"
                color="textPrimary"
                className={classes.mtMd}
              >
                Skills{" "}
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {!user.skills ? (
                  <Typography component="span">Not yet added.</Typography>
                ) : (
                  user.skills.map((skill, idx) => (
                    <RoundedBox
                      key={idx}
                      light
                      borderColor={idx % 2 == 0 ? "primary.main" : "secondary.main"}
                    >
                      {skill}
                    </RoundedBox>
                  ))
                )}
              </Box>
              <Divider className={classes.mtMd} />

              {/* ------------------------------ Education --------------------------- */}
              <Typography
                variant="h6"
                component="h6"
                align="left"
                color="textPrimary"
                className={classes.mtMd}
              >
                Education{" "}
              </Typography>
              {!user.educations ? (
                <Typography component="span">Not yet added.</Typography>
              ) : (
                user.educations.map((inst, idx) => (
                  <Typography
                    variant="body1"
                    align="left"
                    color="textPrimary"
                    className={`${classes.mtMd} ${classes.textBold}`}
                    key={idx}
                  >
                    {inst}
                  </Typography>
                ))
              )}
            </Box>
          </Box>

          {/* ----------------------- Right Site ------------------------ */}
          <Box flex={65}>
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
                <Typography
                  variant="h6"
                  component="h6"
                  align="left"
                  color="textPrimary"
                  className={classes.mtMd}
                >
                  Services{" "}
                  <Typography component="span" variant="body1" color="textSecondary">
                    ({services?.length})
                  </Typography>
                </Typography>
                <Divider className={classes.mtMd} />
              </Box>
            </Box>
            {isServicesLoading && (
              <Box mt={3}>
                <Typography variant="h6" align="center">
                  Loading services...
                </Typography>
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              gridGap={15}
              mt={5}
              mb={5}
              flex="80%"
            >
              {services && services.length > 0 ? (
                services.map((service, idx) => (
                  <ServiceCard
                    key={idx}
                    sid={service._id}
                    userId={service.userId}
                    title={service.title}
                    imgs={service.images}
                    star={service.rating?.rating || 0}
                    starCount={service.rating?.count || 0}
                    price={service.packages[0]?.price || 0}
                    userName={service.userName}
                    userImg={service.userImg}
                    onclick={() => history.push(`/services/${service._id}`)}
                  />
                ))
              ) : (
                <Box mt={3}>
                  <Typography variant="h6" align="center">
                    No services found!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default UserProfile;
