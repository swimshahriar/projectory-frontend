import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { fetchPayments } from "../../actions/paymentAction";
import { fetchUserInfo } from "../../actions/userAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import PaymentsTabs from "../../components/payments/PaymentsTabs";

const Topup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { uid, token } = useSelector((state) => state.auth);
  const { payments, res } = useSelector((state) => state.payments);

  // --------------- fetch user info && topups ---------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchUserInfo(uid));
      await dispatch(fetchPayments({ uid, type: "topup" }, token));
    })();
  }, [uid, dispatch, token]);

  // payments filter
  const requested = payments?.filter((item) => item.status === "pending") || [];
  const succeed = payments?.filter((item) => item.status === "succeed") || [];
  const canceled = payments?.filter((item) => item.status === "failed") || [];

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        <Box my={3}>
          <Typography variant="h4" align="center">
            Topup
          </Typography>
        </Box>

        {/* ------------------- action area ----------------- */}
        <Box
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          gridGap={15}
        >
          <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
            Go back
          </Button>
          <Button variant="contained" color="primary" onClick={() => history.goBack()}>
            Request Topup
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" color="secondary">
            Balance: {user?.balance || 0}tk
          </Typography>
        </Box>

        {/* ----------------------- payments tabs -------------------- */}
        <Box my={3}>
          <PaymentsTabs requested={requested} succeed={succeed} canceled={canceled} topup />
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Topup;
