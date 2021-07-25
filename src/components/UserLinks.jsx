import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const UserLinks = ({ uid, userId }) => {
  const history = useHistory();

  return (
    <Box
      width="94%"
      mt={3}
      boxShadow={3}
      borderRadius={5}
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      gridGap={10}
    >
      <Button color="primary" variant="outlined" onClick={() => history.push("/add-service")}>
        Add Service
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => history.push(`/fav-services/${uid}`)}
      >
        Favorite Services
      </Button>
      <Button color="primary" variant="outlined" onClick={() => history.push("/add-job")}>
        Add Job
      </Button>
      <Button color="secondary" variant="outlined" onClick={() => history.push(`/orders/${uid}`)}>
        Orders
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          if (uid === userId) {
            history.push(`/earnings/${uid}`);
          }
        }}
      >
        Earnings
      </Button>
    </Box>
  );
};

export default UserLinks;
