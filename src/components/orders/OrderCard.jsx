import { Box, Grow, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";

// styles
const useStyles = makeStyles(() => ({
  hover: {
    cursor: "pointer",
  },
}));

const OrderCard = ({ order }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grow in timeout={500}>
      <Paper>
        <Box
          my={2}
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gridGap={10}
          className={classes.hover}
          onClick={() => history.push(`/orders/${order._id}`)}
        >
          <Box>
            <Typography variant="body2" color="secondary">
              Order #{order.id}
            </Typography>
            <Typography variant="h6">{order.title}</Typography>
            <Typography>Buyer: {order.reqPersonUserName}</Typography>
          </Box>

          <Typography>{order.duration} days</Typography>

          <Box>
            <Typography>{order.price} tk</Typography>
            <Typography>{moment(order.updatedAt).fromNow()}</Typography>
          </Box>
        </Box>
      </Paper>
    </Grow>
  );
};

export default OrderCard;
