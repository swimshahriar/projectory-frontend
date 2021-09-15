import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grow,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// actions
import { deleteService } from "../actions/serviceAction";
import AvatarWithUserName from "./AvatarWithUserName";
// components
import CloudImage from "./CloudImage";
import FavoriteBtn from "./FavoriteBtn";
import RatingStarCount from "./RatingStarCount";
import SweetAlert from "./SweetAlert";

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
    <Grow in timeout={500}>
      <Box minWidth="250px" width="250px">
        <Card>
          <CardActionArea onClick={onclick || null}>
            <CloudImage
              publicId={imgs[0]}
              uploadPreset="projectory_services"
              width="250"
              height="150"
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
              <Typography variant="body1" className={classes.title} color="textPrimary">
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
                    SweetAlert.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#36B466",
                      cancelButtonColor: "#F3826E",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteService(sid, token, uid)).then(() =>
                          SweetAlert.fire("Deleted!", "Your file has been deleted.", "success")
                        );
                      }
                    });
                  }}
                >
                  <AiFillDelete />
                </Typography>
              </>
            )}
            {token && uid !== userId && <FavoriteBtn sid={sid} token={token} />}
            <Box width="100%">
              <Typography variant="body1" color="textSecondary" align="right">
                Starting at {price}tk
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Grow>
  );
};

export default ServiceCard;
