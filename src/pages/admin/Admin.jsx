import { Box, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
// internal imports
import AdminLayout from "../../components/layouts/AdminLayout";

const Admin = () => {
  const ob = {};
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
          <Paper>
            <Box minWidth="12rem" p={2}>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  Balance
                </Typography>
              </Box>
              <Typography variant="body1" color="textPrimary">
                Current: 35000tk
              </Typography>
            </Box>
          </Paper>

          {/* ---------------------- active jobs/services -------------------- */}
          <Paper>
            <Box minWidth="12rem" p={2}>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  Active
                </Typography>
              </Box>
              <Typography variant="body1" color="textPrimary">
                jobs: 15
              </Typography>
              <Typography variant="body1" color="textPrimary">
                services: 22
              </Typography>
            </Box>
          </Paper>

          {/* ----------------------- total users ----------------------- */}
          <Paper>
            <Box minWidth="12rem" p={2}>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  Balance
                </Typography>
              </Box>
              <Typography variant="body1" color="textPrimary">
                Current: 35000tk
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default Admin;
