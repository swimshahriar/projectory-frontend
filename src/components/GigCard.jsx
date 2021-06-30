import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

const GigCard = () => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia />
        <CardContent></CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};

export default GigCard;
