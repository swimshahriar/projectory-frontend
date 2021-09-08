import { Box, Button, Container, Slide, Typography } from "@material-ui/core";
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

      {/* -------------------- popular services section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          popular services categories
        </Typography>
      </Container>

      {/* -------------------- about section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          About
        </Typography>
      </Container>

      {/* -------------------- categories section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          Categoies
        </Typography>
      </Container>

      {/* -------------------- Testamonial section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          Testamonial
        </Typography>
      </Container>

      {/* -------------------- guides section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Typography variant="h1" align="center">
          Guides
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
