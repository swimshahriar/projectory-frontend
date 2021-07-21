import React from "react";
import { Box, Typography } from "@material-ui/core";
import { AiFillStar } from "react-icons/ai";

const RatingStarCount = ({ star, starCount }) => {
  return (
    <Box display="flex" justifyItems="center" alignItems="center" gridGap={5}>
      <AiFillStar color={star < 4 ? "#ff61ad" : "#1cbf73"} />
      <Typography variant="body1" color="textSecondary">
        <Typography
          variant="body1"
          component="span"
          color={star < 4 ? "secondary" : "primary"}
        >
          {star}
        </Typography>{" "}
        ({starCount})
      </Typography>
    </Box>
  );
};

export default RatingStarCount;
