import { Box, Button, Container, Grow, Slide, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import heroImg from "../assets/home/hero.webp";
// internal import
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
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          About
        </Typography>
      </Container>

      {/* -------------------- Testimonial section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          Testimonial
        </Typography>
      </Container>

      {/* -------------------- CTA section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          CTA
        </Typography>
      </Container>
    </SiteLayout>
  );
};

export default Home;
