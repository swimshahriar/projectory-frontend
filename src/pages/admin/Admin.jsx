import { Box, CircularProgress, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../actions/jobAction";
import { fetchServices } from "../../actions/serviceAction";
// internal imports
import { fetchUserInfo } from "../../actions/userAction";
import AdminLayout from "../../components/layouts/AdminLayout";

const Admin = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { user, isLoading: userLoading } = useSelector((state) => state.user);
  const { jobs, isLoading: jobLoading } = useSelector((state) => state.jobs);
  const { services, isLoading: serviceLoading } = useSelector((state) => state.services);

  // ------------------ fetch info ------------------
  useEffect(() => {
    (async () => {
      await dispatch(fetchUserInfo(uid));
      await dispatch(fetchJobs());
      await dispatch(fetchServices());
    })();
  }, [uid, dispatch]);

  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Box my={2}>
          <Typography variant="h5" align="center">
            Dashboard
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexWrap="wrap"
          gridGap={15}
        >
          {/* --------------------- balance ------------------ */}
          {user ? (
            <Paper>
              <Box minWidth="12rem" p={2}>
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Balance
                  </Typography>
                </Box>
                <Typography variant="body1" color="textPrimary">
                  Current: {user?.balance}tk
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Box my={3}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {/* ---------------------- jobs -------------------- */}
          <Paper>
            <Box minWidth="12rem" p={2}>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  Jobs
                </Typography>
              </Box>
              <Typography variant="body1" color="textPrimary">
                Total: {jobs?.length}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Active: {jobs?.filter((job) => job.status === "active").length}
              </Typography>
            </Box>
          </Paper>

          {/* ---------------------- services -------------------- */}
          <Paper>
            <Box minWidth="12rem" p={2}>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  Services
                </Typography>
              </Box>
              <Typography variant="body1" color="textPrimary">
                Total: {services?.length}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Active: {services?.filter((service) => service.status === "active").length}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default Admin;
