import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { fetchUserInfo } from "../../actions/userAction";
import SiteLayout from "../../components/layouts/SiteLayout";
import PaymentsTabs from "../../components/payments/PaymentsTabs";

const Topup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.auth);

  // --------------- fetch user info ---------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchUserInfo(uid));
    })();
  }, [uid, dispatch]);

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
          <PaymentsTabs requested={[]} succeed={[]} canceled={[]} topup />
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Topup;
