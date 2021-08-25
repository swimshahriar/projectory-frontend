import { Box, Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// internal imports
import { fetchServices } from "../../actions/serviceAction";
import { fetchRatings } from "../../actions/serviceRatingAction";
import AvatarWithUserName from "../../components/AvatarWithUserName";
import Loading from "../../components/Loading";
import PriceTab from "../../components/PriceTab";
import RatingReview from "../../components/RatingReview";
import RatingStarCount from "../../components/RatingStarCount";
import SwiperComp from "../../components/SwiperComp/SwiperComp";

const ServiceDetails = () => {
  const { sid } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, services } = useSelector((state) => state.services);
  const { uid } = useSelector((state) => state.auth);
  const { ratings } = useSelector((state) => state.serviceRatings);

  useEffect(() => {
    (async () => {
      await dispatch(fetchServices({ sid }));
      await dispatch(fetchRatings({ sid }));
    })();
  }, [dispatch, sid]);

  if (isLoading || !services) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
        gridGap={10}
        my={4}
      >
        <Box my={3} flex={55}>
          <Typography variant="h5">{services.title}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Box my={2} display="flex" justifyItems="center" alignItems="center" gridGap={10}>
              <Box
                onClick={() => history.push(`/user-profile/${services?.userId}`)}
                style={{ cursor: "pointer" }}
              >
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
            {services?.userId !== uid && (
              <Box my={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/chats?rid=${services?.userId}`)}
                >
                  Contact
                </Button>
              </Box>
            )}
          </Box>

          <Box>{services.images && <SwiperComp slides={services?.images} />}</Box>

          {/* -------------------------------- About section ----------------------------- */}

          <Box my={3}>
            <Paper>
              <Box py={5} px={3}>
                <Typography component="h5" variant="h5" gutterBottom>
                  About this Service
                </Typography>

                <Divider />

                <Typography component="p" variant="body1">
                  {services?.about}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* -------------------------------- Price tabs ----------------------------- */}
        <Box my={3} flex={45} maxWidth="700px">
          {services?.packages && <PriceTab packages={services?.packages || false} />}
        </Box>
      </Box>
      <Box my={5}>
        <Typography variant="h5">{services?.rating?.count || 0} Reviews</Typography>
        {services?.rating?.count > 0 && (
          <Box my={3} maxWidth="50%">
            {ratings &&
              ratings.length > 0 &&
              ratings.map((rating, idx) => <RatingReview rating={rating} key={idx} />)}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ServiceDetails;
