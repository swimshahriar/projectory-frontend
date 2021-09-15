import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { createPayments } from "../../actions/paymentAction";
import SiteLayout from "../../components/layouts/SiteLayout";

const Success = () => {
  const { amount } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { res } = useSelector((state) => state.payments);

  // -------------------------- request payment ---------------------
  useEffect(() => {
    (async () => {
      await dispatch(
        createPayments(
          {
            amount: parseFloat(amount),
            paymentType: "topup",
            method: "stripe",
          },
          token
        )
      );
    })();
  }, [dispatch, token, amount]);

  // ------------------- on res redirect -------------------
  useEffect(() => {
    if (res) {
      setTimeout(() => {
        history.replace("/user-topup");
      }, 1500);
    }
  }, [res, history]);

  return (
    <SiteLayout>
      <Container maxWidth="lg">
        <Box my={5}>
          <Typography variant="h3" color="primary" align="center">
            Succeed!
          </Typography>
          <Typography variant="h5" color="secondary" align="center">
            Please wait! Redirecting....
          </Typography>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Success;
