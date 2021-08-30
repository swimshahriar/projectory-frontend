import { Box, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchOrders } from "../../actions/orderAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import OrdersTabs from "../../components/orders/OrdersTabs";

const BuyerServiceOrders = () => {
  const dispatch = useDispatch();
  const { token, uid } = useSelector((state) => state.auth);
  const { isLoading, orders } = useSelector((state) => state.orders);

  // --------------- fetch orders ----------------
  useEffect(() => {
    (async () => {
      await dispatch(
        fetchOrders(
          {
            reqUid: uid,
            type: "services",
          },
          token
        )
      );
    })();

    return () =>
      dispatch({
        type: "RESET_ORDER",
      });
  }, [dispatch, uid, token]);

  // ------------------ filter orders by status ----------------------
  let requested;
  let active;
  let finished;
  let canceled;
  if (orders?.length > 0 && !isLoading) {
    requested = orders.filter((ord) => ord.status === "requested");
    active = orders.filter((ord) => ord.status === "active");
    finished = orders.filter((ord) => ord.status === "finished");
    canceled = orders.filter((ord) => ord.status === "canceled");
  }

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        <Box my={3}>
          <Typography variant="h5" align="center">
            Your Service Orders
          </Typography>
        </Box>
        <Box>
          {isLoading ? (
            <Box dispaly="flex" justifyContent="center" alignItems="center" my={3}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <OrdersTabs
              requested={requested}
              active={active}
              finished={finished}
              canceled={canceled}
            />
          )}
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default BuyerServiceOrders;
