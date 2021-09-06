import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { createPayments, fetchPayments } from "../../actions/paymentAction";
import { fetchUserInfo } from "../../actions/userAction";
import DialogModal from "../../components/DialogModal";
import SiteLayout from "../../components/layouts/SiteLayout";
import PaymentsTabs from "../../components/payments/PaymentsTabs";

const Withdraw = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { uid, token } = useSelector((state) => state.auth);
  const { payments, res, isLoading, error } = useSelector((state) => state.payments);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("bkash");
  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  // --------------- fetch user info ---------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchUserInfo(uid));
      await dispatch(fetchPayments({ uid, type: "withdraw" }, token));
    })();
  }, [uid, dispatch, token]);

  // payments filter
  const requested = payments?.filter((item) => item.status === "pending") || [];
  const succeed = payments?.filter((item) => item.status === "succeed") || [];
  const canceled = payments?.filter((item) => item.status === "failed") || [];

  // -------------------- handle withdraw ----------------------
  const handleWithdraw = async () => {
    if (method !== "stripe" && (amount >= 300 || phoneNumber !== "")) {
      const finalData = {
        amount,
        phoneNumber,
        method,
        paymentType: "withdraw",
      };

      await dispatch(createPayments(finalData, token));
      setAmount(0);
      setPhoneNumber("");
      setOpen(false);
      await dispatch(fetchUserInfo(uid));
      await dispatch(fetchPayments({ uid, type: "withdraw" }, token));
    }
  };

  return (
    <SiteLayout>
      {/* ------------------------ topup modal ---------------------- */}
      <DialogModal
        open={open}
        setOpen={setOpen}
        title="Request Topup"
        bodyText={
          <>
            <Typography variant="body1" gutterBottom>
              Balance: {user?.balance}tk
            </Typography>
          </>
        }
        body={
          <Box display="flex" flexDirection="column" gridGap={15}>
            {error && <Alert color="error">{error}</Alert>}
            <TextField
              required
              type="number"
              variant="outlined"
              label="amount"
              helperText="should be >= 300tk"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <FormControl variant="outlined">
              <InputLabel id="category">Method</InputLabel>
              <Select
                labelId="category"
                label="Category"
                variant="outlined"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <MenuItem value="bkash">Bkash</MenuItem>
                <MenuItem value="nagad">Nagad</MenuItem>
              </Select>
            </FormControl>

            {method !== "stripe" && (
              <>
                <Typography>Send Money: 01777123456</Typography>
                <TextField
                  required
                  variant="outlined"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </>
            )}
          </Box>
        }
        actions={
          <Box m={2}>
            {!isLoading ? (
              <Button variant="contained" color="primary" onClick={handleWithdraw}>
                Request
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Box>
        }
      />

      <Container maxWidth="lg">
        <Box my={3}>
          <Typography variant="h4" align="center">
            Withdraw
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
          <Button
            variant="contained"
            color="primary"
            disabled={user?.balance < 300}
            onClick={() => setOpen(true)}
          >
            {user?.balance >= 300 ? "Withdraw" : "min amount 300tk"}
          </Button>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" color="secondary">
            Balance: {user?.balance || 0}tk
          </Typography>
        </Box>

        {/* ----------------------- payments tabs -------------------- */}
        {!isLoading && (
          <Box my={3}>
            <PaymentsTabs requested={requested} succeed={succeed} canceled={canceled} topup />
          </Box>
        )}
        {isLoading && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="primary" />
          </Box>
        )}
      </Container>
    </SiteLayout>
  );
};

export default Withdraw;
