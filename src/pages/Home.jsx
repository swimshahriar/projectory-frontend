import { Box, Button, Container, Grow, Slide, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FiGlobe } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import heroImg from "../assets/home/hero.webp";
import SiteLayout from "../components/layouts/SiteLayout";
import SwiperSlider from "../components/swiperSlider/SwiperSlider";
import { bng, eng } from "../data";

// styles
const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "#fff",
  },
  imgHero: {
    width: "200px !important",
    [theme.breakpoints.up("sm")]: {
      width: "300px !important",
    },
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
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.settings);

  return (
    <SiteLayout>
      {/* ----------------------- language change btn -------------------- */}
      <Box position="fixed" left={20} bottom={20} zIndex={5}>
        <Button
          startIcon={<FiGlobe />}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch({
              type: "CHANGE_LANGUAGE",
            });
          }}
        >
          {language}
        </Button>
      </Box>

      {/* -------------------- hero section -------------------- */}
      <Box width="100%" height="75vh" mt={-1} bgcolor="primary.dark">
        <Container component="section" maxWidth="lg">
          <Box pt={5} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box flex={50} minWidth="20rem">
              <Slide direction="right" in unmountOnExit timeout={1000}>
                <Typography variant="h3" className={classes.colorWhite}>
                  {language === "eng" ? eng.hero.text[0] : bng.hero.text[0]}{" "}
                  <Typography component="span" variant="h2" color="secondary">
                    {language === "eng" ? eng.hero.text[1] : bng.hero.text[1]}
                  </Typography>{" "}
                  {language === "eng" ? eng.hero.text[2] : bng.hero.text[2]}
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
                    {language === "eng" ? eng.hero.btn : bng.hero.btn}
                  </Button>
                </Slide>
              </Box>
            </Box>

            <Box flex={50}>
              <img src={heroImg} alt="hero.webp" className={classes.imgHero} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* -------------------- services category section -------------------- */}

      <Container component="section" maxWidth="lg">
        <Box my={5}>
          <Typography variant="h3" align="center">
            {language === "eng" ? "Categories" : "বিভাগ"}
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
              {language === "eng" ? eng.categories[0] : bng.categories[0]}
            </Button>
          </Grow>
          <Grow in timeout={700}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=mobile-development")}
            >
              {language === "eng" ? eng.categories[1] : bng.categories[1]}
            </Button>
          </Grow>
          <Grow in timeout={900}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=digital-marketing")}
            >
              {language === "eng" ? eng.categories[2] : bng.categories[2]}
            </Button>
          </Grow>
          <Grow in timeout={1200}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=seo")}
            >
              {language === "eng" ? eng.categories[3] : bng.categories[3]}
            </Button>
          </Grow>
          <Grow in timeout={1500}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.catBtn}
              onClick={() => history.push("/services?cat=graphics-designing")}
            >
              {language === "eng" ? eng.categories[4] : bng.categories[4]}
            </Button>
          </Grow>
        </Box>
      </Container>

      {/* -------------------- about section -------------------- */}
      <Container component="section" maxWidth="lg" id="about">
        <Box my={5}>
          <Typography variant="h3" align="center">
            {language === "eng" ? "About" : "সম্পর্কিত"}
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
              {language === "eng" ? eng.about.title : bng.about.title}
            </Typography>

            <Box my={3}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                1. {language === "eng" ? eng.about.data[0].title : bng.about.data[0].title}
              </Typography>

              <Typography color="textSecondary">
                {language === "eng" ? eng.about.data[0].text : bng.about.data[0].text}
              </Typography>
            </Box>

            <Box my={3}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                2. {language === "eng" ? eng.about.data[1].title : bng.about.data[1].title}
              </Typography>

              <Typography color="textSecondary">
                {language === "eng" ? eng.about.data[1].text : bng.about.data[1].text}
              </Typography>
            </Box>

            <Box my={3}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                3. {language === "eng" ? eng.about.data[2].title : bng.about.data[2].title}
              </Typography>

              <Typography color="textSecondary">
                {language === "eng" ? eng.about.data[2].text : bng.about.data[2].text}
              </Typography>
            </Box>

            <Box my={3}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                4. {language === "eng" ? eng.about.data[3].title : bng.about.data[3].title}
              </Typography>

              <Typography color="textSecondary">
                {language === "eng" ? eng.about.data[3].text : bng.about.data[3].text}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* -------------------- Testimonial section -------------------- */}
      <Box height="35rem">
        <Container component="section" maxWidth="lg">
          <Box my={5}>
            <Typography variant="h3" align="center">
              {language === "eng" ? "Testimonials" : "প্রশংসাপত্র"}
            </Typography>
            <Box mt={5} height="15rem">
              <SwiperSlider />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* -------------------- Join section -------------------- */}
      <Container component="section" maxWidth="lg">
        <Box my={5} px={3} py={5} bgcolor="secondary.light" boxShadow={2} borderRadius={5}>
          <Typography variant="h4" align="center" className={classes.colorWhite}>
            {language === "eng" ? eng.cta.title : bng.cta.title}
          </Typography>
          <Box mt={5} display="flex" justifyContent="center" alignItems="center">
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => history.push("/auth")}
            >
              {language === "eng" ? eng.cta.btn : bng.cta.btn}
            </Button>
          </Box>
        </Box>
      </Container>
    </SiteLayout>
  );
};

export default Home;
