import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#00AB55", // "#1CBF73"
      light: "#A1F4C0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#F3826F", // "#FF61AD"
      contrastText: "#fff",
    },
    text: {
      primary: "#222425",
      secondary: "#404145",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: { fontFamily: "Raleway, sans-serif", fontWeight: 700 },
    h2: { fontFamily: "Raleway, sans-serif", fontWeight: 700 },
    h3: { fontFamily: "Raleway, sans-serif", fontWeight: 700 },
    h4: { fontFamily: "Raleway, sans-serif", fontWeight: 700 },
    h5: { fontFamily: "Raleway, sans-serif", fontWeight: 600 },
    h6: { fontFamily: "Raleway, sans-serif", fontWeight: 600 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 850,
      lg: 1280,
      xl: 1920,
    },
  },
});

const theme = responsiveFontSizes(muiTheme);

export default theme;
