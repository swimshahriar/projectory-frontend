import { Box, Chip, Grow, Paper, Typography } from "@material-ui/core";
import React from "react";

const PaymentCard = ({ payment }) => {
  const obj = {};
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

            <Typography variant="h6" gutterBottom>
              Username: {payment.userName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Amount: {payment.amount}tk
            </Typography>
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
        </Paper>
      </Box>
    </Grow>
  );
};

export default PaymentCard;
