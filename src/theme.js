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
    fontFamily: "Hind Vadodara, sans-serif",
    h1: { fontFamily: "Montserrat, sans-serif" },
    h2: { fontFamily: "Montserrat, sans-serif" },
    h3: { fontFamily: "Lora, serif" },
    h4: { fontFamily: "Lora, serif" },
    h5: { fontFamily: "Lora, serif" },
    h6: { fontFamily: "Lora, serif" },
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
