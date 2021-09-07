import { Box, Button, Chip, Grow, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { updatePayments } from "../../actions/paymentAction";
import SweetAlert from "../SweetAlert";

const PaymentCard = ({ payment }) => {
  const dispatch = useDispatch();
  const { uid, token, error } = useSelector((state) => state.auth);

  return (
    <Grow in timeout={500}>
      <Box minWidth="300px" width="100%">
        <Paper>
          <Box p={3}>
            <Box
              my={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gridGap={10}
            >
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                flexWrap="wrap"
                gridGap={10}
              >
                <Chip
                  label={payment.status}
                  color={payment.status === "failed" ? "secondary" : "primary"}
                />
                <Chip label={payment.method} variant="outlined" color="secondary" />
                <Chip label={payment.paymentType} variant="outlined" color="primary" />
              </Box>
              <Chip label={new Date(payment.updatedAt).toDateString()} />
            </Box>

            {/* ------------------------- info ----------------------- */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gridGap={15}
            >
              <Box>
                <Typography variant="h6" gutterBottom>
                  Username: {payment.userName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Amount: {payment.amount}tk
                </Typography>
              </Box>
              <Box>
                {payment?.phoneNumber && (
                  <Typography variant="body1" gutterBottom>
                    Phone Number: {payment.phoneNumber}
                  </Typography>
                )}
                {payment?.transactionId && (
                  <Typography variant="body1" gutterBottom>
                    TransationId: {payment.transactionId}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* ------------------------- actions -------------------- */}
            {uid === import.meta.env.VITE_ADMIN_ID && payment?.status === "pending" && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                gridGap={15}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={async () => {
                    SweetAlert.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#36B466",
                      cancelButtonColor: "#F3826E",
                      confirmButtonText: "Yes, failed!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(updatePayments(payment._id, { status: "failed" }, token)).then(
                          () =>
                            setTimeout(() => {
                              if (!error) {
                                SweetAlert.fire(
                                  "Done!",
                                  "Topup/withdraw status Failed!.",
                                  "success"
                                );
                                window.location.reload();
                              }
                            }, 1500)
                        );
                      }
                    });
                  }}
                >
                  Failed ?
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    SweetAlert.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#36B466",
                      cancelButtonColor: "#F3826E",
                      confirmButtonText: "Yes, success!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(updatePayments(payment._id, { status: "succeed" }, token)).then(
                          () =>
                            setTimeout(() => {
                              if (!error) {
                                SweetAlert.fire(
                                  "Done!",
                                  "Topup/withdraw status Success!.",
                                  "success"
                                );
                                window.location.reload();
                              }
                            }, 1500)
                        );
                      }
                    });
                  }}
                >
                  Success ?
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Grow>
  );
};

export default PaymentCard;
