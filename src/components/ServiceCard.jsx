import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AiFillStar } from "react-icons/ai";

// components
import CloudImage from "./CloudImage";

// styles
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));

const ServiceCard = ({ title, imgs, star, starCount }) => {
  const classes = useStyles();

  return (
    <Box minWidth="250px" width="20vw">
      <Card>
        <CardActionArea>
          <CloudImage
            publicId={imgs[0]}
            uploadPreset="projectory_services"
            width="250"
            crop="scale"
          />

          <CardContent>
            <Typography
              variant="body1"
              className={classes.title}
              color="textPrimary"
            >
              {title}
            </Typography>
            <Box
              display="flex"
              justifyItems="center"
              alignItems="center"
              gridGap={5}
            >
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
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default ServiceCard;
