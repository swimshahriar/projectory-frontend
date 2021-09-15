import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const BackBtn = ({ url }) => {
  const history = useHistory();

  return (
    <Box my={3} display="flex" justifyContent="center" alignItems="center">
      <Button onClick={() => history.push(url)} variant="outlined" color="primary">
        Go Back
      </Button>
    </Box>
  );
};

export default BackBtn;
