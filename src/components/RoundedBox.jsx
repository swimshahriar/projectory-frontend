import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  iconCenter: {
    display: "flex",
    placeItems: "center",
    gap: 5,
  },
}));

const RoundedBox = ({ children, light = false, borderColor = "textPrimary", icon = false }) => {
  const classes = useStyles();

  return (
    <Box border={1.5} borderColor={borderColor} borderRadius={5} p={1} m={0.5} ml={0} minWidth={30}>
      {light ? (
        <Typography
          variant="body1"
          color="textSecondary"
          className={icon ? classes.iconCenter : ""}
        >
          {children}
        </Typography>
      ) : (
        <Typography variant="body1" color="textPrimary" className={icon ? classes.iconCenter : ""}>
          {children}
        </Typography>
      )}
    </Box>
  );
};

export default RoundedBox;
