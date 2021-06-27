import React from "react";
import { Container, Typography, Box, Divider, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

// components
import Avatar from "../components/Avatar";
import RoundedBox from "../components/RoundedBox";

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
  account: {
    border: 1,
    borderColor: theme.palette.text.secondary,
    borderStyle: "solid",
    borderRadius: 5,
    padding: "2px 3px",
    marginRight: 5,
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
          {/* description */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            boxShadow={3}
            borderRadius={5}
            p={5}
            mt={3}
            mb={3}
          >
            <Typography
              variant="h6"
              component="h6"
              align="left"
              color="textPrimary"
              className={classes.mtMd}
            >
              Description
            </Typography>
            <Typography
              variant="body1"
              component="p"
              align="left"
              color="textSecondary"
              className={classes.mtMd}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              earum deserunt adipisci quas totam aspernatur at non impedit
              consequatur tenetur quibusdam, eos numquam eaque? Nam libero natus
              porro assumenda. Cupiditate!
            </Typography>
            <Divider className={classes.mtMd} />
            {/* languages */}
            <Typography
              variant="h6"
              component="h6"
              align="left"
              color="textPrimary"
              className={classes.mtMd}
            >
              Languages
            </Typography>
            {[
              { lan: "English", level: "Conversational" },
              { lan: "Bengali", level: "Native" },
            ].map((lan, idx) => (
              <Typography
                variant="body1"
                component="p"
                align="left"
                color="textPrimary"
                className={`${classes.mtMd} ${classes.textBold}`}
                key={idx}
              >
                {lan.lan} -{" "}
                <Typography component="span" color="textSecondary">
                  {lan.level}
                </Typography>
              </Typography>
            ))}

            {/* linked account */}
            <Typography
              variant="h6"
              component="h6"
              align="left"
              color="textPrimary"
              className={classes.mtMd}
            >
              Linked Accounts
            </Typography>
            <Box display="flex" flexWrap="wrap" mt={2}>
              {[
                {
                  name: "FaceBook",
                  link: "https://facebook.com/shahriar.swim02",
                },
                { name: "GitHub", link: "https://github.com/swimshahriar" },
              ].map((acc, idx) => (
                <RoundedBox key={idx}>
                  <Link href={acc.link} color="textSecondary">
                    {acc.name}
                  </Link>
                </RoundedBox>
              ))}
            </Box>
            {/* Skills */}
            <Typography
              variant="h6"
              component="h6"
              align="left"
              color="textPrimary"
              className={classes.mtMd}
            >
              Skills{" "}
            </Typography>
            <Box display="flex" flexWrap="wrap" mt={2}>
              {[
                "html5",
                "css3",
                "javascript",
                "reactjs",
                "nextjs",
                "redux",
                "bootstrap",
                "tailwind css",
                "material ui",
                "scss",
                "firebase",
                "nodejs",
                "expressjs",
                "mongodb",
                "mysql",
                "figma",
                "wordpress",
              ].map((skill, idx) => (
                <RoundedBox key={idx} light={true}>
                  {skill}
                </RoundedBox>
              ))}
            </Box>
          </Box>
        </Box>

        <Box flex={60}>Right Box</Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
