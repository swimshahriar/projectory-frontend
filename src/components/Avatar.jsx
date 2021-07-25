import { Avatar as Image } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

// styles
const useStyles = makeStyles((theme) => ({
  start: {
    marginLeft: 0,
  },
  center: {
    margin: "0 auto",
  },
  end: {
    marginRight: 0,
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  medium: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Avatar = ({ alt, src, size = 12, position = "center", variant = "circle", ...props }) => {
  const classes = useStyles();

  return (
    <Image
      alt={alt}
      src={src}
      variant={variant}
      className={`${classes[size]} ${classes[position]}`}
    />
  );
};

export default Avatar;
