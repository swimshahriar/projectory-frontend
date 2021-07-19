import React, { useEffect } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// actions
import { fetchServices } from "../actions/serviceAction";

// components
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const dispatch = useDispatch();
  const { isLoading, services, error } = useSelector((state) => state.services);

  // fetch services
  useEffect(() => {
    (async () => {
      await dispatch(fetchServices());
    })();
    return async () => {
      await dispatch({
        type: "RESET_SERVICES",
      });
    };
  }, []);

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
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Services Page
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gridGap={15}
        mt={5}
      >
        {services ? (
          services.map((service, idx) => (
            <ServiceCard
              key={idx}
              title={service.title}
              imgs={service.images}
              star={service.rating?.rating || 0}
              starCount={service.rating?.count || 0}
            />
          ))
        ) : (
          <Typography variant="body1" align="center">
            No Services Found!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Services;
