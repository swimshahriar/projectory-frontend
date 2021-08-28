import { Box, Button, CircularProgress, Container, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// internal imports
import { fetchSiteSettings, updateSiteSettings } from "../../actions/siteSettingAction";
import AdminLayout from "../../components/layouts/AdminLayout";
import SweetAlert from "../../components/SweetAlert";

// styles
const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: "1rem auto",
    width: "80%",

    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
  },
  errorText: {
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      marginTop: 20,
    },
  },
  formInput: {
    marginBottom: 20,
    width: "100%",
  },
  select: {
    width: "100%",
    marginBottom: 10,
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const AdminSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isLoading, settings, res, error } = useSelector((state) => state.settings);
  const [formData, setFormData] = useState({
    bdtToUsd: 0,
    commission: 0,
  });

  // ------------- fetch settings ----------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchSiteSettings(token));
    })();
  }, [token, dispatch]);

  // ------------------ update state after fetching settings ---------------
  useEffect(() => {
    if (settings) {
      setFormData({
        bdtToUsd: settings[0]?.bdtToUsd || 0,
        commission: settings[0]?.commission || 0,
      });
    }
  }, [settings]);

  // ------------------ res status --------------------
  useEffect(() => {
    if (res) {
      SweetAlert.fire({
        icon: "success",
        title: "Success",
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-right",
        toast: true,
        showConfirmButton: false,
      });
    }
  }, [res]);

  // ---------------- submit handler --------------
  const submitHanlder = async (e) => {
    e.preventDefault();
    await dispatch(updateSiteSettings(settings[0]._id, formData, token));
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box my={2}>
          <Typography variant="h5" align="center">
            Settings
          </Typography>
        </Box>

        {/* -------------------- form ----------------- */}
        <Box width="100%" className={classes.formContainer}>
          {error && (
            <Alert variant="outlined" color="error">
              {error}
            </Alert>
          )}
          {!isLoading ? (
            <form onSubmit={submitHanlder} className={classes.form}>
              <TextField
                type="number"
                label="bdtToUsd"
                required
                variant="outlined"
                className={classes.formInput}
                value={formData.bdtToUsd}
                onChange={(e) => setFormData((prev) => ({ ...prev, bdtToUsd: e.target.value }))}
              />

              <TextField
                type="number"
                label="commission (%)"
                required
                variant="outlined"
                className={classes.formInput}
                value={formData.commission}
                onChange={(e) => setFormData((prev) => ({ ...prev, commission: e.target.value }))}
              />

              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </form>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" my={3}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminSettings;
