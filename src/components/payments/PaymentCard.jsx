import { Box, Chip, Paper, Typography } from "@material-ui/core";
import React from "react";

const PaymentCard = ({ payment }) => {
  const obj = {};
  return (
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
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentCard;
