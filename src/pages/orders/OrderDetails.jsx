import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchOrders } from "../../actions/orderAction";
import SiteLayout from "../../components/layouts/SiteLayout";

// styles
const useStyles = makeStyles(() => ({
  hover: {
    cursor: "pointer",
  },
}));

const OrderDetails = () => {
  const classes = useStyles();
  const { oid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, uid } = useSelector((state) => state.auth);
  const { isLoading, orders, error } = useSelector((state) => state.orders);
  const [isBuyer, setIsBuyer] = useState(true);
  const [userId, setUserId] = useState(null);

  // ------------------ fetch order info -----------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchOrders({ oid }, token));
    })();

    return () => dispatch({ type: "RESET_ORDER" });
  }, [token, dispatch, oid]);

  // ------------------- setting userId and viewer settings ----------------
  useEffect(() => {
    if (orders?.type === "services" && orders?.recPersonId === uid) {
      setIsBuyer(false);
    } else if (orders?.type === "jobs" && orders?.reqPersonId === uid) {
      setIsBuyer(false);
    }

    if (orders?.reqPersonId === uid) {
      setUserId(orders?.recPersonId);
    } else {
      setUserId(orders?.reqPersonId);
    }
  }, [uid, orders]);

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center" my={3}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Box display="flex" justifyContent="center" alignItems="center" my={3}>
            <Alert variant="outlined" color="error">
              {error}
            </Alert>
          </Box>
        )}

        <Box my={3}>
          <Typography variant="h5" align="center">
            Order #{orders?.id}
          </Typography>
        </Box>

        {/* ------------------- package info ------------------- */}
        <Paper>
          <Box
            p={2}
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gridGap={10}
            className={classes.hover}
            onClick={() => {
              if (orders?.type === "services") {
                history.push(`/services/${orders?.serviceId}`);
              } else {
                history.push(`/job-details/${orders?.jobId}`);
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              {orders?.title}
            </Typography>
            {orders?.type === "services" && (
              <Typography variant="h6" color="primary" gutterBottom>
                {orders?.package}
              </Typography>
            )}
            <Typography variant="h6" gutterBottom>
              {orders?.price}tk
            </Typography>
            <Typography variant="h6" gutterBottom>
              {orders?.duration} days
            </Typography>
          </Box>
        </Paper>

        {/* ------------------ buyer info ------------------- */}
        <Paper>
          <Box
            p={2}
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gridGap={10}
          >
            <Typography variant="h6" gutterBottom>
              {isBuyer ? "Seller:" : "Buyer:"} {orders?.reqPersonUserName}
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
              gridGap={10}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  isBuyer
                    ? history.push(`/user-profile/${userId}`)
                    : history.push(`/buyer-profile/${userId}`)
                }
              >
                {isBuyer ? "Seller" : "Buyer"} Profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/chats?rid=${userId}`)}
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* ----------------------- brief ------------------ */}
        <Paper>
          <Box p={2} mt={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gridGap={10}
            >
              <Typography variant="h6" gutterBottom>
                Brief
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                status: {orders?.status}
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              {orders?.brief}
            </Typography>
            <Divider />
            <Box mt={2}>
              <Typography variant="body1" gutterBottom>
                <Typography component="span" color="secondary">
                  NOTES:
                </Typography>{" "}
                If you are not sure/clear about the project, feel free to contact the buyer/seller.
                Use the CONTACT option for further discussion and project submission.
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* ----------------------- action area ----------------- */}
        <Box
          my={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={10}
        >
          {/* -------------------- if order in requested status ---------------- */}
          {orders?.status === "requested" && (
            <>
              {!isBuyer && (
                <Button variant="contained" color="primary">
                  Accept
                </Button>
              )}
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </>
          )}

          {/* -------------------- if order in active status ---------------- */}
          {orders?.status === "active" && (
            <>
              <Paper>
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gridGap={10}
                >
                  <Typography>Dead Line</Typography>
                  <Chip
                    label={moment
                      .unix((moment.now() + orders?.duration * 24 * 3600 * 1000) / 1000)
                      .format("DD MMM YYYY hh:mm a")}
                    variant="outlined"
                    color="secondary"
                  />
                  <Typography>
                    {moment(moment.now() + orders?.duration * 24 * 3600 * 1000) > moment.now() ? (
                      moment(moment.now() + orders?.duration * 24 * 3600 * 1000).fromNow()
                    ) : (
                      <Typography component="span" color="error">
                        Your are late
                      </Typography>
                    )}
                  </Typography>
                </Box>
              </Paper>
              {isBuyer && (
                <Button variant="contained" color="primary">
                  Mark as Finished
                </Button>
              )}
            </>
          )}

          {/* -------------------- if order in finished status ---------------- */}
          {orders?.status === "finished" && (
            <Box display="flex" flexDirection="column" gridGap={10}>
              {!isBuyer && (
                <Typography variant="h6"> You earned: {orders?.sellerMoney || 0} tk</Typography>
              )}
              <Typography>
                Finished on: {moment(orders?.finishedDate).format("DD MMM YYYY")}
              </Typography>
              {!isBuyer && (
                <Button variant="contained" color="primary">
                  Give a rating
                </Button>
              )}
            </Box>
          )}

          {/* -------------------- if order in canceled status ---------------- */}
          {orders?.status === "canceled" && (
            <Box display="flex" flexDirection="column" gridGap={10}>
              <Typography variant="h6" color="error">
                Canceled on: {moment(orders?.canceledDate).format("DD MMM YYYY")}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default OrderDetails;
