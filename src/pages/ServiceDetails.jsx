import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// internal imports
import { fetchServices } from "../actions/serviceAction";
// components
import CloudImage from "../components/CloudImage";

const ServiceDetails = () => {
  const { sid } = useParams();
  const dispatch = useDispatch();
  const { error, res, isLoading, services } = useSelector((state) => state.services);

  useEffect(() => {
    (async () => await dispatch(fetchServices({ sid })))();
  }, [dispatch, sid]);

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box m={3}>
        <Typography variant="h4" align="center">
          Service Page
        </Typography>

        <Typography>{services.title}</Typography>
      </Box>
    </Container>
  );
};

export default ServiceDetails;
