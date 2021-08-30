import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const UserLinks = ({ uid, userId }) => {
  const history = useHistory();

  return (
    <Box
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
      <Button color="primary" variant="outlined" onClick={() => history.push("/user-posted-jobs")}>
        Posted Jobs
      </Button>
      <Button color="secondary" variant="outlined" onClick={() => history.push("/add-job")}>
        Add Job
      </Button>
      <Button color="primary" variant="outlined" onClick={() => history.push("/skill-tests")}>
        Skill Tests
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => history.push(`/orders/seller-services`)}
      >
        Service Orders
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push(`/orders/seller-jobs`)}
      >
        Job Orders
      </Button>
      <Button
        color="secondary"
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
