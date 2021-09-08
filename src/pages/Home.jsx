import { Box, Button, Container, Grow, Slide, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import heroImg from "../assets/home/hero.webp";
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

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <SiteLayout>
      {/* -------------------- hero section -------------------- */}
      <Box width="100%" height="75vh" mt={-1} bgcolor="primary.dark">
        <Container component="section" maxWidth="lg">
          <Box pt={5} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box flex={50} minWidth="20rem">
              <Slide direction="right" in unmountOnExit timeout={1000}>
                <Typography variant="h3" className={classes.colorWhite}>
                  Find the perfect{" "}
                  <Typography component="span" variant="h2" color="secondary">
                    freelance
                  </Typography>{" "}
                  services for your business
                </Typography>
              </Slide>

              <Box my={3}>
                <Slide direction="right" in timeout={1200}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => history.push("/services")}
                  >
                    Services
                  </Button>
                </Slide>
              </Box>
            </Box>

            <Box flex={50}>
              <Slide direction="left" in timeout="1500">
                <img src={heroImg} alt="hero.webp" className={classes.imgHero} />
              </Slide>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* -------------------- services category section -------------------- */}

      <Container component="section" maxWidth="lg">
        <Box my={5}>
          <Typography variant="h3" align="center">
            Categories
          </Typography>
        </Box>

        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gridGap={15}
        >
          <Grow in timeout={500}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=web-development")}
            >
              Web Development
            </Button>
          </Grow>
          <Grow in timeout={700}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=mobile-development")}
            >
              Mobile Development
            </Button>
          </Grow>
          <Grow in timeout={900}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=digital-marketing")}
            >
              Digital Marketing
            </Button>
          </Grow>
          <Grow in timeout={1200}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=seo")}
            >
              SEO
            </Button>
          </Grow>
          <Grow in timeout={1500}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=graphics-designing")}
            >
              Graphics Designing
            </Button>
          </Grow>
        </Box>
      </Container>

      {/* -------------------- about section -------------------- */}
      <Container component="section" maxWidth="lg" id="about">
        <Box my={5}>
          <Typography variant="h3" align="center">
            About
          </Typography>
        </Box>

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
            <img src="https://picsum.photos/id/1/200" alt="about1" className={classes.avatar} />

            <img src="https://picsum.photos/id/160/200" alt="about2" className={classes.avatar} />

            <img src="https://picsum.photos/id/119/200" alt="about3" className={classes.avatar} />
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
                Find high-quality services at every price point. No hourly rates, just project-based
                pricing.
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
                Questions? Our round-the-clock support team is available to help anytime, anywhere.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* -------------------- Testimonial section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h3" align="center">
          Testimonial
        </Typography>
      </Container>

      {/* -------------------- Join section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Box my={5} px={3} py={5} bgcolor="secondary.light" boxShadow={2} borderRadius={5}>
          <Typography variant="h4" align="center" className={classes.colorWhite}>
            Find the talent needed to get your business growing.
          </Typography>
          <Box mt={5} display="flex" justifyContent="center" alignItems="center">
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => history.push("/auth")}
            >
              JOIN NOW
            </Button>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Home;
