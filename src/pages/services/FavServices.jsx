import { Box, Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { fetchFavoriteServices } from "../../actions/serviceAction";
import Loading from "../../components/Loading";
import ServiceCard from "../../components/ServiceCard";

const FavServices = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading, favServices, res, error } = useSelector((state) => state.services);
  const { token } = useSelector((state) => state.auth);

  // fetch fav services
  useEffect(() => {
    (async () => {
      await dispatch(fetchFavoriteServices(token));
    })();
  }, [token, dispatch]);

  if ((isLoading || !res) && !error) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      <Box my={3}>
        <Typography variant="h4" align="center">
          Favorite Services ({favServices?.length || 0})
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gridGap={15}
        my={3}
      >
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        {favServices
          ? favServices.map((service, idx) => (
              <ServiceCard
                key={idx}
                sid={service._id}
                title={service.title}
                imgs={service.images}
                price={service.packages[0].price}
                star={service.rating?.rating || 0}
                starCount={service.rating?.count || 0}
                userName={service.userName}
                userId={service.userId}
                userImg={service.userImg}
                onclick={() => history.push(`/services/${service._id}`)}
              />
            ))
          : !error && (
              <Typography variant="body1" align="center">
                No Favorite Services added yet!
              </Typography>
            )}
      </Box>
    </Container>
  );
};

export default FavServices;
