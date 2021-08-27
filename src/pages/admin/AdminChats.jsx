import { Container, Typography } from "@material-ui/core";
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminChats = () => {
  const ob = {};
  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Typography>Chats page</Typography>
      </Container>
    </AdminLayout>
  );
};

export default AdminChats;
