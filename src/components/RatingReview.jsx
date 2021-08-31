import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const RatingReview = ({ rating }) => (
  <Paper>
    <Box my={2} p={2}>
      <Typography color="secondary" variant="body2">
        Order #{rating.orderId}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{rating.userName}</Typography>
        <Typography variant="body1">{new Date(rating.createdAt).toDateString()}</Typography>
      </Box>

      <Box display="flex" justifyItems="center" alignItems="center" gridGap={5} my={1}>
        <AiFillStar color={rating.star < 4 ? "#ff61ad" : "#1cbf73"} />
        <Typography variant="body1" color="textSecondary">
          <Typography
            variant="body1"
            component="span"
            color={rating.star < 4 ? "secondary" : "primary"}
          >
            {rating.star}
          </Typography>
        </Typography>
      </Box>

      <Typography>{rating.review}</Typography>
    </Box>
  </Paper>
);

export default RatingReview;
