import { Box, Container, Grow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import arif from "../assets/home/arif.jpg";
import mayesha from "../assets/home/mayesha.jpg";
import shahriar from "../assets/home/sm-shahriar.jpg";
import SiteLayout from "../components/layouts/SiteLayout";

// styles
const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "#fff",
  },
  imgHero: {
    width: "300px !important",
    [theme.breakpoints.up("md")]: {
      width: "450px !important",
    },
  },
  catBtn: {
    fontSize: 20,
    padding: 25,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: "50%",
    marginBottom: 10,
    boxShadow: theme.shadows[3],
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <SiteLayout>
      {/* -------------------- about section -------------------- */}
      <Container component="section" maxWidth="lg" id="about">
        <Box my={5}>
          <Typography variant="h3" align="center">
            About
          </Typography>
        </Box>
        <Grow in timeout={500}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gridGap={15}
          >
            <Box
              flex={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              gridGap={20}
            >
              <Box>
                <img src={shahriar} alt="shahriar" className={classes.avatar} />
                <Typography align="center">Shahriar</Typography>
              </Box>
              <Box>
                <img src={arif} alt="arif" className={classes.avatar} />
                <Typography align="center">Arif</Typography>
              </Box>
              <Box>
                <img src={mayesha} alt="mayesha" className={classes.avatar} />
                <Typography align="center">Mayesha</Typography>
              </Box>
            </Box>
            <Box flex={50} px={3} py={5} bgcolor="primary.light" borderRadius={10}>
              <Typography variant="h4" color="textPrimary">
                A whole world of freelance talent at your fingertips
              </Typography>

              <Box my={3}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  1. The best for every budget
                </Typography>

                <Typography color="textSecondary">
                  Find high-quality services at every price point. No hourly rates, just
                  project-based pricing.
                </Typography>
              </Box>

              <Box my={3}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  2. Quality work done quickly
                </Typography>

                <Typography color="textSecondary">
                  Find the right freelancer to begin working on your project within minutes.
                </Typography>
              </Box>

              <Box my={3}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  3. Protected payments, every time
                </Typography>

                <Typography color="textSecondary">
                  Always know what you'll pay upfront. Your payment isn't released until you approve
                  the work.
                </Typography>
              </Box>

              <Box my={3}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  4. 24/7 support
                </Typography>

                <Typography color="textSecondary">
                  Questions? Our round-the-clock support team is available to help anytime,
                  anywhere.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grow>
      </Container>
    </SiteLayout>
  );
};

export default About;
