import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// actions
import { fetchServices, fetchFavoriteServices } from "../actions/serviceAction";

// components
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, services } = useSelector((state) => state.services);

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
          Services
        </Typography>
      </Box>
      <Box display="flex">
        <Box mt={5} flex="20%">
          <Typography variant="h6" align="center" color="textPrimary">
            Filters
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            ({(services && services.length) || 0} services)
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gridGap={15}
          mt={5}
          flex="80%"
        >
          {services ? (
            services.map((service, idx) => (
              <ServiceCard
                key={idx}
                sid={service._id}
                onclick={() => history.push(`/services/${service._id}`)}
                userId={service.userId}
                title={service.title}
                imgs={service.images}
                star={service.rating?.rating || 0}
                starCount={service.rating?.count || 0}
                price={service.packages[0]?.price || 0}
                userName={service.userName}
                userImg={service.userImg}
              />
            ))
          ) : (
            <Typography variant="body1" align="center">
              No Services Found!
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Services;
