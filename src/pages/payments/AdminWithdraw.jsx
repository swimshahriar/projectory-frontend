import { Box, CircularProgress, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchPayments } from "../../actions/paymentAction";
import AdminLayout from "../../components/layouts/AdminLayout";
import PaymentsTabs from "../../components/payments/PaymentsTabs";

const AdminWithdraw = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, payments } = useSelector((state) => state.payments);

  // ------------------ fetch payments ----------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchPayments({ type: "withdraw" }, token));
    })();
  }, [token, dispatch]);

  // --------------------------- payments filter -----------------------
  const requested = payments?.filter((item) => item.status === "pending") || [];
  const succeed = payments?.filter((item) => item.status === "succeed") || [];
  const canceled = payments?.filter((item) => item.status === "failed") || [];

  return (
    <AdminLayout>
      <Container maxwidth="lg">
        <Box my={2}>
          <Typography variant="h4" align="center">
            Withdraw
          </Typography>
        </Box>

        {/* ----------------------- payments tabs -------------------- */}
        {!isLoading && (
          <Box my={3}>
            <PaymentsTabs requested={requested} succeed={succeed} canceled={canceled} />
          </Box>
        )}
        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
          </Box>
        )}
      </Container>
    </AdminLayout>
  );
};

export default AdminWithdraw;
