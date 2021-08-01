import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// internal imports
import { fetchServices } from "../actions/serviceAction";
import AvatarWithUserName from "../components/AvatarWithUserName";
import RatingStarCount from "../components/RatingStarCount";
import SwiperComp from "../components/SwiperComp/SwiperComp";

const ServiceDetails = () => {
  const { sid } = useParams();
  const dispatch = useDispatch();
  const { error, res, isLoading, services } = useSelector((state) => state.services);

  useEffect(() => {
    (async () => await dispatch(fetchServices({ sid })))();
  }, [dispatch, sid]);

  if (isLoading || !services) {
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gridGap={10}
        my={4}
      >
        <Box my={3} flex={55}>
          <Typography variant="h5">{services.title}</Typography>
          <Box my={2} display="flex" justifyItems="center" alignItems="center" gridGap={10}>
            <Box>
              <AvatarWithUserName
                userName="swimshahriar"
                publicId={services.userImg}
                uploadPreset="projectory_services"
                width="30"
                height="30"
                radius="max"
                crop="fill"
              />
            </Box>
            <Box mb={0.5}>
              <RatingStarCount
                star={services?.rating?.rating || 0}
                starCount={services?.rating?.count || 0}
              />
            </Box>
          </Box>

          <Box>{services.images && <SwiperComp slides={services?.images} />}</Box>
        </Box>

        <Box my={3} flex={45}>
          <Typography variant="h5">{services.title}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetails;
