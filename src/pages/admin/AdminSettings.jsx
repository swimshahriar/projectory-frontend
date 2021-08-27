import { Container, Typography } from "@material-ui/core";
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminSettings = () => {
  const ob = {};
  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Typography>Site Settings page</Typography>
      </Container>
    </AdminLayout>
  );
};

export default AdminSettings;
