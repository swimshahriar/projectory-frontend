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

// components
import CloudImage from "./CloudImage";
import RatingStarCount from "../components/RatingStarCount";
import FavoriteBtn from "../components/FavoriteBtn";
import AvatarWithUserName from "./AvatarWithUserName";

// styles
const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
  },
}));

const ServiceCard = ({
  title,
  imgs,
  star,
  starCount,
  price,
  userName,
  userImg,
}) => {
  const classes = useStyles();

  return (
    <Box minWidth="250px">
      <Card>
        <CardActionArea>
          <CloudImage
            publicId={imgs[0]}
            uploadPreset="projectory_services"
            width="250"
            crop="scale"
          />

          <CardContent>
            <AvatarWithUserName
              userName={userName}
              publicId={userImg}
              uploadPreset="projectory_services"
              width="30"
              height="30"
              radius="100"
              crop="scale"
            />
            <Typography
              variant="body1"
              className={classes.title}
              color="textPrimary"
            >
              {title}
            </Typography>
            <RatingStarCount star={star} starCount={starCount} />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FavoriteBtn />
          <Box width="100%">
            <Typography variant="body1" color="textSecondary" align="right">
              Starting at {price}tk
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ServiceCard;
