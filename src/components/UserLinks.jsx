import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// styles
const useStyles = makeStyles(() => ({}));

const UserLinks = ({ uid, userId }) => {
  const classes = useStyles();
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
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push("/add-service")}
      >
        Add Service
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => history.push("/fav-services")}
      >
        Favorite Services
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push("/add-job")}
      >
        Add Job
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => history.push("/orders")}
      >
        Orders
      </Button>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => history.push("/earnings")}
      >
        Earnings
      </Button>
    </Box>
  );
};

export default UserLinks;
