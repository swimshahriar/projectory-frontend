import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

// components
import CloudImage from "./CloudImage";
import RatingStarCount from "../components/RatingStarCount";
import FavoriteBtn from "../components/FavoriteBtn";
import AvatarWithUserName from "./AvatarWithUserName";

// actions
import { deleteService } from "../actions/serviceAction";

// styles
const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "bold",
  },
  btn: {
    cursor: "pointer",
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
  onclick,
  userId = null,
  sid = null,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);
  const history = useHistory();

  return (
    <Box minWidth="250px" width="250px">
      <Card>
        <CardActionArea onClick={onclick ? onclick : null}>
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
              radius="max"
              crop="fill"
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
          {uid === userId && (
            <>
              <Typography
                className={classes.btn}
                color="primary"
                onClick={() => history.push(`/edit-service/${sid}`)}
              >
                <BiEdit />
              </Typography>
              <Typography
                className={classes.btn}
                color="error"
                onClick={async () => {
                  await dispatch(deleteService(sid, token, uid));
                }}
              >
                <AiFillDelete />
              </Typography>
            </>
          )}
          {token && <FavoriteBtn sid={sid} token={token} />}
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
