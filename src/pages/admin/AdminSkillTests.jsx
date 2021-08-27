import { Container, Typography } from "@material-ui/core";
import React from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminSkillTests = () => {
  const ob = {};
  return (
    <AdminLayout>
      <Container maxWidth="lg">
        <Typography>Skill tests page</Typography>
      </Container>
    </AdminLayout>
  );
};

export default AdminSkillTests;
