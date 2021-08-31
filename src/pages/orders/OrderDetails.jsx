import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, Rating } from "@material-ui/lab";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchOrders, finishedOrder, updateOrder } from "../../actions/orderAction";
import { addRatings, fetchRatings } from "../../actions/serviceRatingAction";
import DialogModal from "../../components/DialogModal";
import SiteLayout from "../../components/layouts/SiteLayout";
import RatingReview from "../../components/RatingReview";
import SweetAlert from "../../components/SweetAlert";

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
  const { isLoading, orders, error, finishedRes, updatedRes } = useSelector(
    (state) => state.orders
  );
  const {
    isLoading: ratingLoading,
    ratings,
    error: ratingError,
    giveRatingRes,
  } = useSelector((state) => state.serviceRatings);
  const [isBuyer, setIsBuyer] = useState(true);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // ------------------ fetch order info -----------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchOrders({ oid }, token));
      await dispatch(fetchRatings({ oid }));
    })();

    return () => {
      dispatch({ type: "RESET_ORDER" });
      dispatch({ type: "RESET_RATINGS" });
    };
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

  // ------------------ finished order ----------------
  useEffect(() => {
    if (finishedRes || updatedRes) {
      (async () => {
        await dispatch(fetchOrders({ oid }, token));
      })();
    }
  }, [dispatch, finishedRes, updatedRes, oid, token]);

  // ---------------------------- accept handler ----------------------
  const handleSubmit = async (action) => {
    if (action === "accept") {
      await dispatch(
        updateOrder(
          orders?._id,
          {
            status: "active",
            activeDate: moment.now(),
          },
          token
        )
      );
    } else if (action === "cancel") {
      await dispatch(
        updateOrder(
          orders?._id,
          {
            status: "canceled",
            canceledDate: moment.now(),
          },
          token
        )
      );
    } else if (action === "finished") {
      await dispatch(
        finishedOrder(
          orders?._id,
          {
            finishedDate: moment.now(),
          },
          token
        )
      );
    }
  };

  // ------------------ handle rating -------------------
  const handleRating = async () => {
    if (rating > 0 && review !== "") {
      const finalData = {
        star: rating,
        review,
        orderId: orders._id,
      };
      await dispatch(addRatings(orders.serviceId, finalData, token));
      setRating(5);
      setReview("");
      setOpen(false);
    }
  };

  return (
    <SiteLayout>
      {/* --------------------------- dialog modal --------------------- */}
      <DialogModal
        open={open}
        setOpen={setOpen}
        title="Leave a rating and review"
        bodyText="Please give your valuable feedback about the quality of the project and seller."
        body={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gridGap={15}
            my={2}
          >
            <Box>
              <Typography gutterBottom>your rating: {rating}</Typography>
              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={(_, newValue) => setRating(newValue)}
              />
            </Box>
            <TextField
              required
              label="your review"
              variant="outlined"
              multiline
              rows={7}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Box>
        }
        actions={
          <Box m={2}>
            {!ratingLoading ? (
              <Button variant="contained" color="primary" onClick={handleRating}>
                Submit
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Box>
        }
      />

      <Container maxWidth="lg">
        {/* ---------------------- back button --------------------- */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
            <BiArrowBack />
            Go Back
          </Button>
        </Box>

        {(isLoading || !orders) && (
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

        {/* ------------------ buyer/seller info ------------------- */}
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
              {isBuyer ? "Seller:" : "Buyer:"}{" "}
              {orders?.type === "jobs" ? (
                <Typography component="span">
                  {isBuyer ? orders?.reqPersonUserName : orders?.recPersonUserName}
                </Typography>
              ) : (
                <Typography component="span">
                  {isBuyer ? orders?.recPersonUserName : orders?.reqPersonUserName}
                </Typography>
              )}
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
              {orders?.type === "jobs" && isBuyer && (
                <Button variant="contained" color="primary" onClick={() => handleSubmit("accept")}>
                  Accept
                </Button>
              )}
              {orders?.type === "services" && !isBuyer && (
                <Button variant="contained" color="primary" onClick={() => handleSubmit("accept")}>
                  Accept
                </Button>
              )}
              <Button variant="outlined" color="secondary" onClick={() => handleSubmit("cancel")}>
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
                      .unix(
                        (Date.parse(orders?.activeDate) + orders?.duration * 24 * 3600 * 1000) /
                          1000
                      )
                      .format("DD MMM YYYY hh:mm a")}
                    variant="outlined"
                    color="secondary"
                  />
                  <Typography>
                    {moment(Date.parse(orders?.activeDate) + orders?.duration * 24 * 3600 * 1000) >
                    moment.now() ? (
                      moment(
                        Date.parse(orders?.activeDate) + orders?.duration * 24 * 3600 * 1000
                      ).fromNow()
                    ) : (
                      <Typography component="span" color="error">
                        Your are late
                      </Typography>
                    )}
                  </Typography>
                </Box>
              </Paper>
              {isBuyer && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    SweetAlert.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#36B466",
                      cancelButtonColor: "#F3826E",
                      confirmButtonText: "Yes, finish it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleSubmit("finished");
                      }
                    })
                  }
                >
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
              {orders?.type === "services" && isBuyer && (
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                  Give a rating
                </Button>
              )}
              {ratings && (
                <Box width="18rem">
                  <RatingReview rating={ratings} />
                </Box>
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
