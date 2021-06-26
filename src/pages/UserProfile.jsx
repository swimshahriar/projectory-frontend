import React from "react";
import { Container, Typography, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

// components
import Avatar from "../components/Avatar";

// styles
const useStyles = makeStyles((theme) => ({
  iconCenter: {
    display: "flex",
    placeItems: "center",
    gap: 5,
  },
  onlineBadge: {
    border: 1.5,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    padding: "2px 3px",
    paddingRight: "5px",
    opacity: 0.8,
  },
  mtMd: {
    marginTop: 10,
  },
  mrSm: {
    marginRight: 5,
  },
  textBold: {
    fontWeight: "bold",
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { uid, token } = useSelector((state) => state.auth);

  return (
    <Container>
      <Box display="flex" justifyContent="center" gridGap={15} mt={5}>
        <Box flex={40}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            boxShadow={3}
            borderRadius={5}
            p={5}
          >
            <Box width="100%">
              <Box display="flex" justifyContent="flex-end">
                <Typography
                  align="center"
                  color="primary"
                  className={`${classes.onlineBadge} ${classes.iconCenter}`}
                >
                  <GoPrimitiveDot /> Online
                </Typography>
              </Box>
              <Avatar
                alt="shahriar"
                src="https://i.pravatar.cc/300?img=57"
                size="large"
                position="center"
              />
              <Typography
                variant="h6"
                component="h6"
                align="center"
                color="textPrimary"
                className={classes.mtMd}
              >
                shahriar_swim
              </Typography>
              <Typography
                variant="body1"
                component="p"
                align="center"
                color="textSecondary"
                className={classes.mtMd}
              >
                Experienced Software Engineer
              </Typography>
              <Divider className={classes.mtMd} />
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.mtMd}
              >
                <Typography
                  variant="body1"
                  component="p"
                  color="textSecondary"
                  className={classes.iconCenter}
                >
                  <HiLocationMarker />
                  From
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="textPrimary"
                  className={classes.textBold}
                >
                  Bangladesh
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                className={classes.mtMd}
              >
                <Typography
                  variant="body1"
                  component="p"
                  color="textSecondary"
                  className={classes.iconCenter}
                >
                  <BsFillPersonFill />
                  Member Since
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  color="textPrimary"
                  className={classes.textBold}
                >
                  {new Date().toDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box flex={60}>Right Box</Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
