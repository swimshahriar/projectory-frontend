import { Box, Button, Container, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { BiGlobe } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import { useHistory } from "react-router-dom";
// internal imports
import logo from "../assets/favicon.svg";

// styles
const useStyles = makeStyles(() => ({
  linkHover: {
    cursor: "pointer",
  },
  logo: {
    width: 40,
  },
  iconCenter: {
    display: "flex",
    placeItems: "center",
    gap: 5,
  },
}));

const Footer = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Box width="100%" mt={3}>
        {/* ----------------------- footer top --------------------- */}
        <Divider />
        <Container maxWidth="lg">
          <Box
            my={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
            gridGap={15}
          >
            {/* -------------------- services -------------------- */}
            <Box minWidth="10rem">
              <Typography variant="h5" color="textPrimary" align="start">
                Services
              </Typography>
              <Box
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gridGap={10}
              >
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=web-development")}
                >
                  Web Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=mobile-development")}
                >
                  Mobile Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=digital-marketing")}
                >
                  Digital Marketing
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=seo")}
                >
                  SEO
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=graphics-designing")}
                >
                  Graphics Designing
                </Typography>
              </Box>
            </Box>
            {/* -------------------- jobs -------------------- */}
            <Box minWidth="10rem">
              <Typography variant="h5" color="textPrimary" align="start">
                Jobs
              </Typography>
              <Box
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gridGap={10}
              >
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=web-development")}
                >
                  Web Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=mobile-development")}
                >
                  Mobile Development
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=digital-marketing")}
                >
                  Digital Marketing
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/jobs?cat=seo")}
                >
                  SEO
                </Typography>
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/services?cat=graphics-designing")}
                >
                  Graphics Designing
                </Typography>
              </Box>
            </Box>
            {/* -------------------- about -------------------- */}
            <Box minWidth="10rem">
              <Typography variant="h5" color="textPrimary" align="start">
                About
              </Typography>
              <Box
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gridGap={10}
              >
                <Typography
                  className={classes.linkHover}
                  color="textSecondary"
                  onClick={() => history.push("/about")}
                >
                  About us
                </Typography>
                <Typography className={classes.linkHover} color="textSecondary">
                  Careers
                </Typography>
                <Typography className={classes.linkHover} color="textSecondary">
                  Partnerships
                </Typography>
                <Typography className={classes.linkHover} color="textSecondary">
                  Privacy Policy
                </Typography>
                <Typography className={classes.linkHover} color="textSecondary">
                  Terms of Services
                </Typography>
              </Box>
            </Box>
            {/* -------------------- social links -------------------- */}
            <Box minWidth="18rem">
              <Typography variant="h5" color="textPrimary" align="start">
                Social Links
              </Typography>
              <Box
                my={2}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
                gridGap={10}
              >
                <Button startIcon={<SiFacebook />}>FaceBook</Button>
                <Button startIcon={<SiInstagram />}>Instragram</Button>
                <Button startIcon={<SiLinkedin />}>LinkedIn</Button>
              </Box>
            </Box>
          </Box>
        </Container>
        <Divider />
      </Box>

      {/* --------------------- footer bottom ----------------- */}
      <Box width="100%">
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gridGap={15}
          >
            <Box my={2} display="flex" justifyContent="flex-start" alignItems="center" gridGap={10}>
              <img className={classes.logo} src={logo} alt="logo" type="image/svg" />
              <Typography color="textSecondary">
                © Projectory Ltd. {new Date().getFullYear()}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gridGap={10}
            >
              <Typography className={classes.iconCenter}>
                <BiGlobe />
                English
              </Typography>

              <Typography className={classes.iconCenter}>
                <GiMoneyStack />
                BDT
              </Typography>
            </Box>
          </Box>
        </Container>
        <Divider />
      </Box>
    </>
  );
};

export default Footer;
